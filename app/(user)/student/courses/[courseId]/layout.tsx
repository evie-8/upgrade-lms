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
            <article className='col-span-8'>
               {children}
            </article>
            <article className='col-span-4 w-full'>
                <CourseSidebar course={course}/>
            </article>
        </div>
      
    </section>
  )
}
 
export default CourseLayout;
