import Courses from '@/components/courses/course';
import MetaData from '@/components/ui/meta-data';

const CoursesPage = () => {
  return (
   <>
   <MetaData title='upgrade-courses' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
     <Courses/>
   </>
  )
}

export default CoursesPage