import CourseId from '@/components/admin/courses/course-id'
import MetaData from '@/components/ui/meta-data'


const TutorCoursePage = ({params}: {params: {courseId: string}}) => {
  return (
    <>
    <MetaData title='upgrade-admin | Course update' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
   
   <CourseId courseId={params.courseId}/>

   </>
  )
}

export default TutorCoursePage