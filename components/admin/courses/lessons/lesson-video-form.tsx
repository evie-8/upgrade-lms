"use client"

import { FileUploader } from "@/components/ui/file-uploader";
import { Chapter, Course, Lesson, MuxData } from "@prisma/client";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle, VideoIcon } from "lucide-react";
import Image from "next/image";
import Video from 'next-video'
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";


import toast from "react-hot-toast";
import * as z from "zod";


interface Props {
    lesson: Lesson & {chapter: Chapter} & {muxData?: MuxData | null};
}

const LessonVideoForm: React.FC<Props> = ({lesson}) => {
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useTransition();
  

  const router = useRouter();
  
  const toggle = () => {
    setEditing(prev => !prev)
  }

  const formschema = z.object({
    videoUrl: z.string().min(1, 'course image reqired'),
});



const onSubmit = (values: z.infer<typeof formschema>) => {
    setPending(async() => {
       try {
       
        await axios.patch(`/api/courses/${lesson.chapter.courseId}/chapters/${lesson.chapterId}/lessons/${lesson.id}`, values);
           
            toast.success("Course lesson updated");
            toggle();
            router.refresh();
            
        } catch  {
            toast.error("Something went wrong")
        } 
        
    })
}

  return (
    <div className="mt-6  bg-primary/10 rounded-md p-4">
       <div className="font-semibold  flex items-center justify-between">
            Lesson Video
            <button onClick={toggle} className="inline-flex whitespace-nowrap items-center justify-center gap-1 text-sm">
               {
                editing ? <> Cancel</> : <>
                     {
                      !lesson.videoUrl ? 
                      <>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Add a video
                      </> : 
                      <>
                        <Pencil className="h-4 w-4 mr-2"/>
                         Edit video
                      </>
                     }
                </>
               }
            </button>
       </div>
        {
            editing ? (
               <div>
                <FileUploader endpoint="chapterVideo" onChange={(url) => {
                 
                  if (url) {
                    onSubmit({videoUrl: url})
                  }
                } } />

                  <div className="text-xs text-gray/60 mt-4 italic">Upload a video for this chapter's lesson</div>
               </div>
             
                
            ) : 
                (
                  lesson.videoUrl? 
                  <div className="relative aspect-video rounded-xl overflow-hidden mt-2">
                  
                   <Video src={lesson.videoUrl} controls className="w-full h-full rounded-xl"/>
                  </div>
                  : (
                    <div className="flex items-center justify-center h-60 bg-white1 rounded-md mt-4">
                      <VideoIcon className="h-10 w-10"/>
                    </div>
                  )
                )
        }
        {lesson.videoUrl && !editing && (
          <div className="text-xs text-gray/60 mt-2  ">
            Videos can take a few minutes to process. Refresh the page if video does not appear.
          </div>
        )}
    </div>
  )
}

export default LessonVideoForm;