import CoursePage from '@/components/admin/courses/course-page'
import { currentUser } from '@/lib/auth'
import prismadb from '@/lib/db'
import React from 'react'

const TutorCoursesPage = async () => {
  const user = await currentUser();

  const data = await prismadb.course.findMany({
    where: {
      tutorId: user?.id
    },
    orderBy: {
      createdAt: 'desc'
    }, include: {
      chapter: {
        include: {
          Lesson: true
        }
      }
    }
  })
  return (
   
      <CoursePage data={data}/>
  )
}

export default TutorCoursesPage