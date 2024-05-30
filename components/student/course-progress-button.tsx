"use client";


import { formatter } from '@/lib/utils';
import { Button } from '../ui/button'
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import { useRouter as useRouter1 } from 'next/navigation';
import { useConfettiModal } from '@/hooks/use-confetti';
import { Chapter, Lesson } from '@prisma/client';

interface Props {
  courseId: string;
  chapterId: string;
  nextLesson: Lesson & {chapter: Chapter};
  isCompleted: boolean;
  lessonId: string;
  
}

const CourseProgressButton = ({courseId, chapterId, lessonId, nextLesson, isCompleted}: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const router1 = useRouter1();
  const confetti = useConfettiModal();

  const onClick = async() => {
    try {
      setIsLoading(true);

      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}/progress`, {
      isCompleted: !isCompleted
      });

      if (!isCompleted && !nextLesson) {
        confetti.onOpen();
      }
      
      if (!isCompleted && nextLesson) {
        router.push(`/student/courses/${courseId}/chapter/${nextLesson.chapterId}/lesson/${nextLesson.id}`, {}, {showProgressBar: true});
      }

      toast.success("Your course progress has been updated");
      router1.refresh();
    
    } catch  {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button onClick={onClick}
    variant={isCompleted ? 'destructive': 'success'}
    disabled={isLoading}>
   {
    isCompleted ? 
    <>
     
      <XCircle className='h-4 w-4 mr-2'/>
      Mark as incomplete
    </> :
    <>
   
    <CheckCircle className='h-4 w-4 mr-2'/>
    Mark as complete
  </>

   }
    </Button>
  )
}

export default CourseProgressButton