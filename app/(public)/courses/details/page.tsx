import CourseDetails from '@/components/courses/course-details'
import MetaData from '@/components/ui/meta-data'

const CourseDetailPage = () => {
  return (
  <>
    <MetaData title='upgrade-course-details' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
   
   <CourseDetails/>
  </>
  )
}

export default CourseDetailPage