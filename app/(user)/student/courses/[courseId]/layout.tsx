import CourseSidebar from "@/components/student/course-sidebar"
import { currentUser } from "@/lib/auth"
import prismadb from "@/lib/db"

const CourseLayout = async ({
    children, 
    params
}: {
    children: React.ReactNode,
    params: {courseId: string}

    }) => {
        
        const user = await currentUser();
        const course = await prismadb.course.findUnique({
            where: {
                id: params.courseId
            }, 
            include: {
                chapter: {
                    where: {
                        isAvailable: true
                    },
                    orderBy: {
                        position: 'asc'
                    },
                    include: {
                        Lesson: {
                            where: {
                                isDraft: false
                            },
                            orderBy: {
                                position: 'asc'
                            },
                            include: {
                                userProgress: {
                                    where: {
                                        userId: String(user?.id)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        
  return (
   
    <section className='bg-white1'>
      
        <div className='h-auto lg:flex'>
            <article className='lg:pr-[400px] w-full'>
               {children}
            </article>
            <article className={`h-screen max-lg:hidden p-2 bg-white shadow-md fixed right-0 w-[400px] `}>
                <CourseSidebar course={course}/>
            </article>
        </div>
      
    </section>
  )
}
 
export default CourseLayout;
