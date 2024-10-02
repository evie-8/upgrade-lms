import { BookText, GraduationCap, Pencil, Stars, Videotape } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { FcSettings } from 'react-icons/fc'
import { Progress } from '../ui/progress'
import { Button } from '../ui/button'
import { currentUser } from '@/lib/auth'
import { getStudentDashboardCourses } from '@/action-server/get-student-dashboard-courses'
import SearchCourseCard from './search-course-card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'

const StudentDashboard = async () => {
  const user = await currentUser();
  const {coursesInProgress, completedCourses, reviews, recommendedCourses} = await getStudentDashboardCourses(String(user?.id));

  let numberOfLessons = 0

  for (const course of coursesInProgress) {
    for (const chapter of course.chapter) {
      for (const lesson of chapter.Lesson) {
       numberOfLessons = numberOfLessons + 1 
      }
    }
  }

  return (
    <section className='p-4 lg:p-6 bg-white1 min-h-screen'>
      <section className='flex flex-col-reverse md:grid grid-cols-12 gap-6 mb-6'>
        <article className=' md:col-span-8 w-full lg:col-span-9 '>
           
            <table className='w-full rounded-lg p-4 bg-white overflow-x-auto'>
              <thead className='w-full'>
                <tr className='flex w-full justify-around p-3 border-b border-grey'>
                <th scope='col' className='w-1/4 text-left line-clamp-1'>Course Name</th>
                <th scope='col' className='w-1/4 text-left max-lg:hidden line-clamp-1'>Tutor</th>
                <th scope='col' className='w-4/12 text-left line-clamp-1'>Course Progress</th>
                <th scope='col' className='w-1/5 text-left max-lg:hidden line-clamp-1'>Level</th>
                <th scope='col' className='w-1/12 text-left line-clamp-1'>Action</th>
                </tr>
              </thead>
              <tbody className='w-full'>

              {coursesInProgress.length === 0 && (
                <tr className='flex items-center p-5 justify-center text-sm'>
                  <td colSpan={5}>You have completed all courses that you enrolled in</td>
                </tr>
              )}

              {coursesInProgress.length > 0 &&
                coursesInProgress.map((course, i) => (
                  <tr key={i} className={`w-full flex gap-3 justify-between p-4 ${i < coursesInProgress.length - 1 ? 'border-b border-grey' : ''}`}>
                    <td className='w-1/4 line-clamp-1'>{course.name}</td>
                    <td className='w-1/4 flex items-center max-lg:hidden'>
                      <Image width={40} alt='image' height={40} className='rounded-full mr-3 w-5 h-5' src={course.tutor?.image || ''} />
                      <p className='line-clamp-1'>{course.tutor?.name}</p>
                    </td>
                    <td className='w-4/12 flex items-center'>
                      <Progress value={Math.round(Number(course?.progress))} className='h-2 mr-2' />
                      <span className='text-sm'>{Math.round(Number(course?.progress))}%</span>
                    </td>
                    <td className='w-1/5 max-lg:hidden'>
                      <span className='p-1 text-sm border border-grey bg-white1 rounded-md'>
                        {course.difficulty}
                      </span>
                    </td>
                    <td className='w-1/12'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <FcSettings size={23} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='border-grey bg-white' align='center'>
                          <Link href={`/student/courses/${course.id}`}>
                            <DropdownMenuItem className='hover:text-destructive'>
                              <Pencil className='h-4 w-4 mr-2' />
                              Continue
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}

               
              </tbody>
            </table>
                         
        </article>

        <article className=' md:col-span-4 lg:col-span-3 md:bg-white md:rounded-lg md:p-3 w-full'>

           <nav className='md:flex flex-col max-md:grid grid-cols-2 grid-rows-2 gap-3  my-3'>
            <div className=' p-3 flex gap-4 shadow-lg w-full rounded-lg bg-white'>
                <div className='flex items-center justify-center rounded-lg h-12 w-12 bg-blue1'>
                    <BookText size={30} className='text-white'/>
                </div>
                <div className='flex flex-col '>
                    <span className='font-bold'>{coursesInProgress?.length} {coursesInProgress.length === 1 ? 'Course': 'Courses'}</span>
                    <span className='text-sm'>In progress</span>
                </div>
              </div>

              <div className='p-3 flex gap-4 shadow-lg w-full rounded-lg bg-white'>
                <div className='flex items-center justify-center rounded-lg h-12 w-12 bg-warning'>
                    <Videotape size={30} className='text-white'/>
                </div>
                <div className='flex flex-col '>
                    <span className='font-bold'>{numberOfLessons} {numberOfLessons === 1 ? 'Lesson' : 'Lessons'}</span>
                    <span className='text-sm'>Contained</span>
                </div>
              </div>

              <div className=' p-3 flex gap-4 shadow-lg w-full rounded-lg bg-white'>
                <div className='flex items-center justify-center rounded-lg h-12 w-12 bg-success'>
                    <GraduationCap size={30} className='text-white'/>
                </div>
                <div className='flex flex-col '>
                <span className='font-bold'>{completedCourses?.length} {completedCourses.length === 1 ? 'Course': 'Courses'}</span>
                    <span className='text-sm'>Completed</span>
                </div>
              </div>

              <div className=' p-3 flex gap-4 shadow-lg w-full rounded-lg bg-white'>
                <div className='flex items-center justify-center rounded-lg h-12 w-12 bg-danger'>
                    <Stars size={30} className='text-white'/>
                </div>
                <div className='flex flex-col '>
                <span className='font-bold'>{reviews.length} {reviews.length === 1 ? 'Review': 'Reviews'}</span>
                    <span className='text-sm'>Made</span>
                </div>
              </div>
           </nav>
          
        </article>
      </section>

    <section className='bg-white rounded-lg p-8'>

      <div className='flex justify-between mb-5'>
        <div className='flex flex-col'>
          <h2 className='font-bold'>
            Recommended Courses
          </h2>
          <p className='text-sm'>
            Based on your learning, we have found courses you might like
          </p>
        
        </div>
        <Button>
         <Link href={"/student/courses"}>
         View All</Link>
        </Button>
      </div>

                {
                  (recommendedCourses.length == 0) && 
                  <div className='flex items-center justify-center text-sm'>
                        You have enrolled in all courses
                  </div>
                }
      {
        (recommendedCourses.length > 0) && 

       <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {recommendedCourses.map((course) => (
          <SearchCourseCard course={course}/>
        )) 
      }       
       </div>
      }


  </section>
    </section>
  )
}

export default StudentDashboard