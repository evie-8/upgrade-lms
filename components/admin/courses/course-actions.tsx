"use client";

import { Button } from '@/components/ui/button'
import ConfirmAction from '@/components/ui/confirm-action';
import { Chapter, Lesson } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar';
import { useRouter as useRouter1 } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
interface Props {
    isAvailable: boolean;
    courseId: string;
    disabled: boolean;
   
}

const CourseActions = ({isAvailable, courseId, disabled}: Props) => {
  const router = useRouter();
  const router1 = useRouter1();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async() => {
    try {
      setIsLoading(true);
       
        await axios.patch(`/api/courses/${courseId}/publish`, {
          isAvailable
        });
        if (isAvailable) {
          toast.success("Course unpublished");
          router1.refresh();
        } else {
          toast.success('Course published');
          router1.refresh();
        }
       
    } catch  {
      toast.error("Something went wrong");
      
    }   finally{
      setIsLoading(false);
    }
  }

  const onDelete = async() => {
    try {
      
      setIsLoading(true);
      {
        /**
         * if (chapter.Lesson.length) {
        for(const lesson of chapter.Lesson) {
            try {
                const res = await axios.delete(`/api/courses/${courseId}`);
                console.log("finished", res)
            } catch (error) {
                console.error(`Failed to delete lesson ${lesson.id}:`, error);
                throw new Error(`Failed to delete lesson ${lesson.id}`);
            }   }    
     }
         */
      }
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted");
      router1.refresh();
      router.push(`/tutor/courses`)
      router1.refresh();
      
    } catch {
      toast.error("Something went wrong")
      
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className='flex items-center gap-x-2'>
         <Button size={"sm"} variant={"outline"} disabled={disabled || isLoading } onClick={onClick} className='font-normal bg-black2 border-transparent text-white hover:bg-black2/90'>
            {isAvailable ? 'Unpublish': 'Publish'}
        </Button>
       <ConfirmAction onConfirm={onDelete}>
       <Button size={"sm"} variant={"destructive"} className='px-1' disabled={isLoading}>
            <Trash/>
        </Button>
       </ConfirmAction>
    </div>
  )
}

export default CourseActions