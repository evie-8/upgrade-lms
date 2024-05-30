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

            include: {
                
                 chapter: {
                    include: {
                        Lesson: {
                            include: {
                                userProgress: true
                            },
                        },
                    quiz: true,
                    },
                 },
                 orders: true,
                 category: true,
                 tutor: true,
                 reviews: {
                    include: {
                        reviewer: true
                    }
                 },
            }
        });

        const lesson = await prismadb.lesson.findUnique({
            where: {
                id: lessonId,
                isDraft: false,
                chapterId: chapterId
            },

            include: {
                chapter: {
                    include: {
                        Lesson: {
                            include: {
                                userProgress: true
                            }
                        },
                        quiz: true
                    }
                }
            }
        });

        if (!lesson || !course) {
            throw new Error("Lesson or course not found.");      
        };

        let muxData = null;
        let attachments: Resource[] = [];
        let nextLesson: Lesson | null = null;
        let prevLesson: Lesson | null = null;

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

            const findNextLesson: any = async (currentChapterId: string, currentLessonPosition: number) => {
                // Try to find the next lesson in the same chapter
                let next = await prismadb.lesson.findFirst({
                    where: {
                        chapterId: currentChapterId,
                        isDraft: false,
                        position: {
                            gt: currentLessonPosition
                        },
                    },
                    orderBy: {
                        position: 'asc',
                    },
                    include: {
                        chapter: true
                    }
                });

                // If no next lesson found, look for the next chapter and continue searching
                if (!next) {
                    const nextChapter = await prismadb.chapter.findFirst({
                        where: {
                            courseId: courseId,
                            position: {
                                gt: lesson.chapter.position
                            }
                        },
                        orderBy: {
                            position: 'asc'
                        }
                    });

                    if (nextChapter) {
                        next = await prismadb.lesson.findFirst({
                            where: {
                                chapterId: nextChapter.id,
                                isDraft: false,
                            },
                            orderBy: {
                                position: 'asc',
                            },
                            include: {
                                chapter: true
                            }
                        });

                        // Continue finding the next lesson recursively if needed
                        if (!next) {
                            next = await findNextLesson(nextChapter.id, 0); // Reset position for the new chapter
                        }
                    }
                }

                return next;
            };

            const findPrevLesson: any = async (currentChapterId: string, currentLessonPosition: number, courseId: string) => {
                // Try to find the previous lesson in the same chapter
                let prev = await prismadb.lesson.findFirst({
                    where: {
                        chapterId: currentChapterId,
                        isDraft: false,
                        position: {
                            lt: currentLessonPosition
                        },
                    },
                    orderBy: {
                        position: 'desc',
                    },
                    include: {
                        chapter: true
                    }
                });
            
                    if (!prev) {
                    const prevChapter = await prismadb.chapter.findFirst({
                        where: {
                            courseId: courseId,
                            position: {
                                lt: lesson.chapter.position
                            }
                        },
                        orderBy: {
                            position: 'desc'
                        }
                    });
            
                    if (prevChapter) {
                        prev = await prismadb.lesson.findFirst({
                            where: {
                                chapterId: prevChapter.id,
                                isDraft: false,
                            },
                            orderBy: {
                                position: 'desc',
                            },
                            include: {
                                chapter: true
                            }
                        });
            
                            if (!prev) {
                            prev = await findPrevLesson(prevChapter.id, Number.MAX_SAFE_INTEGER, courseId); // Set position to max for the new chapter
                        }
                    }
                }
            
                return prev;
            };
            

            nextLesson = await findNextLesson(chapterId, lesson.position);
            prevLesson = await findPrevLesson(chapterId, lesson.position, courseId);
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
            prevLesson,
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
            prevLesson: null,
            userProgress: null,
            attachments: null,
            purchase: null 

         }
    }
} 