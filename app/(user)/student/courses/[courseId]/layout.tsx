import CourseSidebar from "@/components/student/course-sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { currentUser } from "@/lib/auth"
import prismadb from "@/lib/db"
import { Menu, UserRound } from "lucide-react"
import Image from "next/image"

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
        
        <div className={`h-[71px] z-10 p-8 border-b border-grey flex items-center bg-white sticky top-0 left-0`}>
            <Sheet>
                <SheetTrigger className='lg:hidden pr-4 hover:opacity-75 transition'>
                    <Menu size={25} className='font-bold'/>
                </SheetTrigger>
                <SheetContent side="left" className='p-0 bg-white'>
                    <CourseSidebar course={course}/>
                </SheetContent>
    </Sheet>

        
        <div className='flex items-center justify-between ml-auto'>

            <h2 className="max-sm:hidden text-sm mr-2">{user?.name}</h2>
            <div className={`flex gap-3 items-center justify-center rounded-full ${!user?.image && 'bg-blue1'} w-8 h-8 border border-transparent`}>
                
                {
                user && user.image ? 
                <Image src={user?.image} alt='profile image' width={32}  height={32} className='rounded-full'/> : 
                <UserRound  className='text-white'/>
                }
            
            </div>
         </div>
        </div>
      
        <div className='h-auto lg:flex'>
            <article className='lg:pr-[400px] w-full'>
               {children}
            </article>
            <article className={`h-full max-lg:hidden p-2 bg-white shadow-md fixed right-0 w-[400px] `}>
                <CourseSidebar course={course}/>
            </article>
        </div>
      
    </section>
  )
}
 
export default CourseLayout;
