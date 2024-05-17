"use client";

import { Button } from '@/components/ui/button'
import ConfirmAction from '@/components/ui/confirm-action';
import axios from 'axios';
import { Trash } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar';
import { useRouter as useRouter1 } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
interface Props {
    isAvailable: boolean;
    courseId: string;
    chapterId: string;
    disabled: boolean;
}

const ChapterActions = ({isAvailable, courseId, chapterId, disabled}: Props) => {
  const router = useRouter();
  const router1 = useRouter1();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async() => {
    try {
      
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/`);
      toast.success("Chapter deleted");
      router1.refresh();
      router.push(`/tutor/courses/${courseId}`)
      
    } catch {
      toast.error("Something went wrong")
      
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className='flex items-center gap-x-2'>
         <Button size={"sm"} variant={"outline"} disabled={disabled || isLoading } className='font-normal bg-black2 border-transparent text-white'>
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

export default ChapterActions