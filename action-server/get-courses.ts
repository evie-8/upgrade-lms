import prismadb from "@/lib/db";
import { Category, Course, Lesson } from "@prisma/client";
import getProgress from "./get-progress";

type CourseWithProgressAndCategory = Course & {
    category: Category | null;
    chapter : {Lesson : Lesson[]} [],
    progress: number | null;
};

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string; 
}

export const getCourses = async ({
    userId,
    title,
    categoryId,
}: GetCourses): Promise<CourseWithProgressAndCategory[ ]> => {

    try {
        const courses = await prismadb.course.findMany({
            where: {
                isAvailable: true,
                name: {
                    contains: title
                },
                categoryId: categoryId,
            },
            include: {
                category: true,
                chapter: {
                    where: {
                        isAvailable: true
                    },
                    include: {
                        Lesson: {
                            where: {
                                isDraft: false
                            },
                            select: {
                                id: true
                            },
                        },
                        
                    },
                    
                },
                orders: {
                    where: {
                        userId: userId
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
            
        });

        const courseWithProgress: CourseWithProgressAndCategory[] = await Promise.all(
            courses.map(
                async course => {
                    if (course.orders.length === 0 && course.paymentStatus === 'Paid') {
                        return {
                            ...course,
                            progress: null 
                        }
                    }

                    const   {percentageCompleted} = await getProgress(userId, course.id);

                    return {
                        ...course,
                        progress: percentageCompleted
                    };
                })
        );

        return courseWithProgress;
        
        
    } catch (error) {
        console.log("search_get_courses", error);
        return [];
    }
} 