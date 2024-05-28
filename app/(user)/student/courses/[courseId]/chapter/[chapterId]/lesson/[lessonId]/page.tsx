import LessonView from '@/components/student/lesson'



const LessonPlayer = ({params}: {params: {lessonId: string, chapterId: string}}) => {
  return (
    <LessonView lessonId={params.lessonId} chapterId={params.chapterId}/>
  )
}

export default LessonPlayer