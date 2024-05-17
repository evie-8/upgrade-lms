import CourseId from '@/components/admin/courses/course-id'


const TutorCoursePage = ({params}: {params: {courseId: string}}) => {
  return (
   <CourseId courseId={params.courseId}/>
  )
}

export default TutorCoursePage