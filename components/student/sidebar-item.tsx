"use client";

import { formatDuration } from "@/lib/duration";
import { Chapter, Lesson, UserProgress } from "@prisma/client";
import { Check, Lock, Play } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SideBarItem = ({chapter, isLocked}: {chapter: Chapter & {Lesson: Lesson[] | null & {userProgress: UserProgress[]| null} | null} | null, isLocked: boolean}) => {
  const [view, setView] = useState(false);
  const router  = useRouter();
  const pathname = usePathname();

  const [duration, setDuration] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        const handleLoadedMetadata = () => {
            if (videoElement) {
                setDuration(videoElement.duration);
            }
        };

        if (videoElement) {
            videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

            // Load video metadata
            videoElement.load();
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, []);
 
  return (
    <div className="flex flex-col my-3  border border-grey rounded-md p-3 w-full">
              <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center justify-start gap-4">
                   {/* <p className="flex items-center justify-center rounded-full bg-primary/10 text-primary w-5 h-5"><span className="m-1">1</span></p>*/}
                    <h2 className={`font-medium ${pathname.includes(String(chapter?.id)) ? 'text-warning': ''}`}>{chapter?.name}</h2>
                  </div>
                {
                  isLocked ? 

                  <p className="flex items-center justify-center">
                    <Lock className="w-4 h-4 text-danger"/>
                  </p> :

                  <p className="w-3 h-3 ml-auto relative"  onClick={() =>  setView(prev => !prev)}>
                  <span className=" h-[2px] w-full bg-gray rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.3s] ease-in"/>
                  <span className={`h-[2px] w-full bg-gray rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.3s] ease-in ${view ? '': 'rotate-90'}`}/>
                  </p>
                }
                </div>
                {/**lessons */}
                <div className={`flex-col my-3 w-full ${view ? 'flex': 'hidden'}`}>
                  {
                   chapter && chapter.Lesson && chapter.Lesson.length && 

                    chapter.Lesson.map((lesson) => (
                      <div key={lesson.id} onClick={() => router.push(`/student/courses/${chapter.courseId}/chapter/${chapter.id}/lesson/${lesson.id}`) } 
                      className={ `w-full cursor-pointer flex items-center justify-between gap-2 border-b border-grey p-2 ml-2 my-2 ${pathname.includes(lesson.id) && 'bg-purple/20 rounded-md'}`}>
                      {/**lessons name -title */}
                      
                     <div className="flex items-center justify-center gap-3">
                    
                     {
                      lesson.userProgress?.[0]?.isCompleted ? 
                      <button className=" flex items-center justify-center p-1 rounded-full border border-success">
                      <Check className="w-3 h-3 text-success"/>
                    </button> :
                      <button className=" flex items-center justify-center p-1 rounded-full border border-primary">
                      <Play className="w-3 h-3 text-primary"/>
                    </button>

                   
                     }
                     <p className="text-sm">{lesson.name}</p>
                     </div>

                     <video ref={videoRef} style={{ display: 'none' }}>
                        <source src={String(lesson?.videoUrl)} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                     <p className="text-sm ">{formatDuration(duration)}</p>
                   </div>
                    ))
                  }           
                 
                </div>
                
            </div>
  )
}

export default SideBarItem