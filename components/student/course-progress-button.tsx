"use client";


import { formatter } from '@/lib/utils';
import { Button } from '../ui/button'
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  courseId: string;
  chapterId: string;
  nextLessonId: string | undefined;
  isCompleted: boolean;
  lessonId: string;
  
}

const CourseProgressButton = ({courseId, chapterId, lessonId, nextLessonId, isCompleted}: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const onClick = async() => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`, {
        url: window.location.pathname
      });

      window.location.assign(response.data.url);
    } catch  {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button variant={isCompleted ? 'default': 'success'}  disabled={isLoading}>
   {
    isCompleted ? 
    <>
     
      <XCircle className='h-4 w-4 mr-2'/>
      Not completed
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