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
                    orderBy:{
                        position: 'asc'
                    },
                    include: {
                        Lesson: {
                            where: {
                                isDraft:false
                            },
                            include: {
                                userProgress: {
                                    where: {
                                        userId: String(user?.id)
                                    },
                                }
                            },
                            orderBy: {
                                position: 'asc'
                            },
                        }
                    }
                }
            }
        })
  return (
   
    <section className='bg-white1 '>
      
        <div className='relative grid grid-cols-12 h-screen'>
            <article className='lg:col-span-8 col-span-12'>
               {children}
            </article>
            <article className='max-lg:hidden lg:col-span-4  bg-white shadow-md p-8 fixed right-0'>
                <CourseSidebar course={course}/>
            </article>
        </div>
      
    </section>
  )
}
 
export default CourseLayout;
