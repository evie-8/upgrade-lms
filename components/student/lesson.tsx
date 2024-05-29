"use client"

import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Chapter, Lesson } from "@prisma/client";
import { Group, Loader2, Lock, Signal, Star, Users2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Props {
  category: string | undefined;
  level: string;
  title: string;
lessonId: string;
lesson: Lesson & {chapter: Chapter};
nextLessonId: string | undefined;
courseId: string;
isLocked: boolean;
completeOnEnd: boolean | undefined;
playbackId: string ;
}

const LessonView = ({
  lessonId,
  lesson,
  title,
  category,
  level,
  nextLessonId,
  courseId,
  isLocked,
  completeOnEnd,
  playbackId
}: Props) => {
  const [isReady, setIsReady]  = useState(false);
  
  return (
 
     <section className="p-4 md:p-8">
        <h2 className="font-semibold"><span className="text-primary">Course</span> 
        <span className=""> &gt; {title} </span>

        <span className="text-primary">&gt; Chapter</span> 
        <span className=""> &gt; {lesson.chapter.name} </span>
        </h2>
        <div className="relative my-4 aspect-video rounded-md">
            {
              !isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black2 rounded-md">
                  <Loader2 className="h-8 w-8 animate-spin text-white"/>
                </div>
              )
            }
             {
              isLocked && (
                <div className="absolute inset-0 flex  flex-col items-center justify-center gap-y-2 bg-black2 rounded-md">
                  <Lock className="h-8 w-8 text-white"/>
                  <p className="text-sm text-white">This lesson is locked</p>
                </div>
              )
            }

            {
              !isLocked && (
                <MuxPlayer
               
                 title={lesson.name}
                 className={cn(!isReady && "hidden")}
                 onCanPlay={() => setIsReady(true)}
                 onEnded={() => {}}
                 autoPlay
                 playbackId={playbackId}
                />
              )
            }
        </div>

        <div className="flex flex-col items-start justify-start gap-y-3">
            <button className="inline text-sm px-4 py-1 bg-primary/20 rounded-md text-primary">
              {category}
            </button>
            <h2 className="text-xl font-semibold">{lesson.name}</h2>

            <div className="flex justify-between gap-5">
              <p className="text-sm">Course by <span className="font-semibold underline">Nafula Evelyn Ouma</span></p>
              <p className="flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-ranking"/>
                <span className="font-semibold text-sm">4.8
                <span className="font-normal text-sm">(100)</span>
                </span>
                
              </p>
              <p className="flex items-center justify-center gap-3">
              <Signal className="w-4 h-4 text-danger"/>
              <span className="font-medim text-sm">{level}</span>
              </p>
              <p className="flex items-center justify-center gap-3">
              <Users2 className="w-4 h-4 text-purple"/>
              <span className="font-medim text-sm">12 students</span>
              </p>

            </div>
        </div>

    </section>
   
  )
}

export default LessonView