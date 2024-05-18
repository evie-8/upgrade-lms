"use client";

import { Button } from '@/components/ui/button'
import ConfirmAction from '@/components/ui/confirm-action';
import { Trash } from 'lucide-react'
import React from 'react'
interface Props {
    isAvailable: boolean;
    courseId: string;
    disabled: boolean;
}

const CourseActions = ({isAvailable, courseId, disabled}: Props) => {
  return (
    <div className='flex items-center gap-x-2'>
         <Button size={"sm"} variant={"outline"} disabled={disabled } className='font-normal bg-black2 border-transparent text-white hover:bg-black2/90'>
            {isAvailable ? 'Unpublish': 'Publish'}
        </Button>
       <ConfirmAction onConfirm={() => {}}>
       <Button size={"sm"} variant={"destructive"} className='px-1'>
            <Trash/>
        </Button>
       </ConfirmAction>
    </div>
  )
}

export default CourseActions