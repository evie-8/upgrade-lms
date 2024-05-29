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
   
    <section className='bg-white1'>
      
        <div className='grid grid-cols-12 h-auto'>
            <article className='lg:col-span-8 col-span-12'>
               {children}
            </article>
            <article className={`relative max-lg:hidden lg:col-span-4 p-2 bg-white shadow-md `}>
                <CourseSidebar course={course}/>
            </article>
        </div>
      
    </section>
  )
}
 
export default CourseLayout;
