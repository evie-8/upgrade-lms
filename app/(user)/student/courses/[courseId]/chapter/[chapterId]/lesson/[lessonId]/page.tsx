import { getLesson } from '@/action-server/lesson';
import LessonView from '@/components/student/lesson'
import { AlertBanner } from '@/components/ui/alert-banner';
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation';

const LessonPlayer = async ({params}: {params: {lessonId: string, chapterId: string, courseId: string}}) => {
  const user = await currentUser();
  const {
    course,
    lesson,
    muxData,
    attachments,
    nextLesson,
    userProgress,
    purchase
  } = await getLesson({
    userId: String(user?.id),
    lessonId: params.lessonId,
    chapterId: params.chapterId,
    courseId: params.courseId

  });

  if (!lesson || !course) {
    return redirect('/student/dashboard');
  }

  const isLocked = !lesson.chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && userProgress?.isCompleted;


  return (
    <>
    {
      userProgress?.isCompleted && (
        <AlertBanner variant={'success'} label='You already completed this lesson.'/>
      )
    }

{
      isLocked && (
        <AlertBanner variant={'warning'} label='You need to buy this course to watch this lesson.'/>
      )
    }
       <LessonView 
       level={course.difficulty}
       category={course.category?.name}
       title={course.name}
       lessonId={params.lessonId} 
       lesson={lesson}
       nextLessonId={nextLesson?.id}
       courseId={params.courseId}
       isLocked={isLocked}
       playbackId={muxData?.placybackId!}
       completeOnEnd={completeOnEnd}
       />

    </>
     )
}

export default LessonPlayer