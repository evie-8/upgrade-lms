import LessonIdForm from '@/components/admin/courses/lessons/lesson-form'
import MetaData from '@/components/ui/meta-data'

const LessonIDPage = async({params}: {params: {lessonId: string, chapterId: string, courseId: string}}) => {
  return (
    <>
    <MetaData title='upgrade-admin | Lesson' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
   
    <LessonIdForm chapterId={params.chapterId} lessonId={params.lessonId} courseId={params.courseId}/>
    </>
  )
}

export default LessonIDPage