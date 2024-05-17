import LessonIdForm from '@/components/admin/courses/lessons/lesson-form'
import React from 'react'

const LessonIDPage = async({params}: {params: {lessonId: string, chapterId: string, courseId: string}}) => {
  return (
    <LessonIdForm chapterId={params.chapterId} lessonId={params.lessonId} courseId={params.courseId}/>
  )
}

export default LessonIDPage