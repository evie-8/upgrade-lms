import prismadb from "@/lib/db"
import { Lesson, Resource } from "@prisma/client";


interface GetLessonProps {
    userId: string;
    courseId: string;
    chapterId: string;
    lessonId: string;
}

export const getLesson = async({userId, courseId, chapterId, lessonId}: GetLessonProps) => {
    try {

        const purchase = await prismadb.order.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId: courseId
                }
            }
        });

        const course = await prismadb.course.findUnique({
            where: {
                isAvailable: true,
                id: courseId,
            },

            select: {
                 price: true,
                 name: true,
                 category: true,
                 difficulty: true,
                 description: true,
                 paymentStatus: true,
            }
        });

        const lesson = await prismadb.lesson.findUnique({
            where: {
                id: lessonId,
                isDraft: false,
                chapterId: chapterId
            },

            include: {
                chapter: true
            }
        });

        if (!lesson || !course) {
            throw new Error("Lesson or course not found.");      
        };

        let muxData = null;
        let attachments: Resource[] = [];
        let nextLesson: Lesson | null = null;

        if (purchase || course.paymentStatus === 'Free') {
            attachments = await prismadb.resource.findMany({
                where: {
                    courseId: courseId
                }
            });
        };  

        if (lesson.chapter.isFree || purchase) {
            muxData = await prismadb.muxData.findUnique({
                where: {
                    lessonId: lessonId
                }
            });

            nextLesson = await prismadb.lesson.findFirst({
                where: {
                    chapterId: chapterId,
                    isDraft: false,
                    position: {
                        gt: lesson.position
                    },
                },
                orderBy: {
                    position: 'asc',
                }
            });
        };

        const userProgress = await prismadb.userProgress.findUnique({
            where: {
                userId_lessonId: {
                    userId: userId,
                    lessonId: lessonId
                }
            }
        })
        
        return {
            lesson,
            course,
            muxData,
            nextLesson,
            userProgress,
            attachments,
            purchase 

        }

        
    } catch (error) {
        console.log("[GET_LESSON]", error);
        return {
            lesson: null,
            course: null,
            muxData: null,
            nextLesson: null,
            userProgress: null,
            attachments: null,
            purchase: null 

         }
    }
} 