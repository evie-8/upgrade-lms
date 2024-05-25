import Courses from '@/components/courses/course';
import MetaData from '@/components/ui/meta-data';
import prismadb from '@/lib/db';

const CoursesPage =  async () => {
  const courses = await prismadb.course.findMany({
    where: {
      NOT: {
        courseStatus: 'Coming_Soon'
      },
    },
    include: {
      category: true
    }
  })
  return (
   <>
   <MetaData title='upgrade-courses' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
     <Courses courses={courses}/>
   </>
  )
}

export default CoursesPage