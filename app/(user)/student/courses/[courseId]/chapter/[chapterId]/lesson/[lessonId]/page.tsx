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
    prevLesson,
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
  const completeOnEnd = (!!purchase && !userProgress?.isCompleted) || (course.paymentStatus === 'Free' && !userProgress?.isCompleted);

  return (
    <>
    {
      userProgress?.isCompleted && (
        <AlertBanner variant={'success'} className='z-10 sticky top-[71px]' label='You already completed this lesson.'/>
      )
    }

{
      isLocked && (
        <AlertBanner variant={'warning'}  className='z-10 sticky top-[71px]' label='You need to buy this course to watch this lesson.'/>
      )
    }
       <LessonView 
       
       purchase={purchase}
       //@ts-ignore
       course={course}
       resources={attachments}
       //@ts-ignore
       lesson={lesson}
       userProgress={userProgress!}
       //@ts-ignore
       nextLesson={nextLesson}
       //@ts-ignore
       prevLesson={prevLesson}
       courseId={params.courseId}
       isLocked={isLocked}
       playbackId={muxData?.placybackId!}
       completeOnEnd={completeOnEnd}
       />

    </>
     )
}

export default LessonPlayer