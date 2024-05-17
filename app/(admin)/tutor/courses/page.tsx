import Link from 'next/link'
import React from 'react'

const TutorCoursesPage = () => {
  return (
   
       <Link href={"/tutor/courses/create"}>
       <button className='bg-primary px-6 py-2 border text-sm border-transparent rounded-lg text-white'>
            New course
        </button>
       </Link>
 
  )
}

export default TutorCoursesPage