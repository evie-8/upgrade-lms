"use client";
import { Button } from '@/components/ui/button'
import ConfirmAction from '@/components/ui/confirm-action';
import { Trash } from 'lucide-react'
import React from 'react'
interface Props {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    lessonId: string;
    isDraft: boolean;
    
}

const LessonActions = ({ courseId, chapterId, lessonId, isDraft, disabled}: Props) => {
  return (
    <div className='flex items-center gap-x-2'>
          <Button size={"sm"} variant={"outline"} disabled={disabled} className='font-normal bg-black2 border-transparent text-white'>
            {isDraft ? 'Publish': 'Unpublish'}
        </Button>
        <ConfirmAction onConfirm={() => {}}>
        <Button size={"sm"} variant={"destructive"} className='px-1'>
            <Trash/>
        </Button>
        </ConfirmAction>
    </div>
  )
}

export default LessonActions