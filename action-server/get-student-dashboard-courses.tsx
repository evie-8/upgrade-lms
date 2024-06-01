import prismadb from "@/lib/db";
import { Category, Course, Lesson, Review, User } from "@prisma/client";
import getProgress from "./get-progress";

type CourseWithProgessWithCategory = Course & {
    category: Category | null;
    chapter : {Lesson : Lesson[]} [],
    tutor: User | null,
    progress: number | null,
};

type StudentDashboardCourses = {
    completedCourses: CourseWithProgessWithCategory[];
    coursesInProgress: CourseWithProgessWithCategory[];
    reviews: Review[];
    recommendedCourses: CourseWithProgessWithCategory[];
}

export const getStudentDashboardCourses = async(userId: string): Promise<StudentDashboardCourses> => {

    try {
        const reviews = await prismadb.review.findMany({
            where: {
                reviewerId: userId
            }
        })

        const courses = await prismadb.course.findMany({
            where: {
                isAvailable: true,
               
            },
            include: {
                category: true,
                tutor: true,
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


        const coursesFilter: CourseWithProgressAndCategory[] = await Promise.all(
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

        const coursesInProgress = coursesFilter.filter((course) =>  
           ((course.orders.length > 0) &&( (course.progress ?? 0) < 100)) || (course.paymentStatus === 'Free' &&   ((course.progress ?? 0) > 0 && (course.progress ?? 0) < 100)));
        const completedCourses = coursesFilter.filter((course) => course.progress === 100);
        const recommendedCourses = coursesFilter.filter(course => 
            course.orders.length === 0 || 
            (course.paymentStatus === 'Free' && (course.progress ?? 0) <= 0)
        );
        
        return {
            completedCourses,
            coursesInProgress,
            reviews,
            recommendedCourses,
        }
    } catch (error) {
        console.log("Student_dasboard_courses", error);
        return {
            completedCourses: [],
            coursesInProgress: [],
            reviews: [],
            recommendedCourses: [],
        }
        
    }

}  