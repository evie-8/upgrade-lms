import CoursePage from '@/components/admin/courses/course-page'
import MetaData from '@/components/ui/meta-data'
import { currentUser } from '@/lib/auth'
import prismadb from '@/lib/db'

const TutorCoursesPage = async () => {
  const user = await currentUser();

  const data = await prismadb.course.findMany({
    where: {
      tutorId: user?.id
    },
    orderBy: {
      createdAt: 'desc'
    }, include: {
      
      category: true
    }
  })
  return (
    <>
    <MetaData title='upgrade-admin | Courses' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
   
      <CoursePage data={data}/>
      </>
  )
}

export default TutorCoursesPage