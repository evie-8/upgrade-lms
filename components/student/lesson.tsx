"use client"

import "react-quill/dist/quill.bubble.css";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar } from '@fortawesome/free-solid-svg-icons';
import MuxPlayer from "@mux/mux-player-react";
import { Category, Chapter, Course, Lesson, Order, Quiz, Resource, Review, User, UserProgress } from "@prisma/client";
import { ArrowLeft, ArrowRight, File, Info, Loader2, Lock, MessageCircleIcon, Paperclip, Signal, Star, Users2 } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";
import EnrollButton from "./enroll-button";
import CourseProgressButton from "./course-progress-button";
import { useRouter } from "next-nprogress-bar";
import axios from "axios";
import { useConfettiModal } from "@/hooks/use-confetti";
import toast from "react-hot-toast";

import ReviewCreation from "./review-create";
import { useCurrentUser } from "@/hooks/use-current-user";

import AllReviews from "./all-review";
import QuizButton from "./quiz-button";

interface Props {

resources : Resource[];
purchase: Order | null;
course: Course & {category: Category} & {tutor: User} & {orders: Order[]} & {reviews: Review[] & {reviewer: User }} ;
lesson: Lesson & {chapter: Chapter & {quiz: Quiz} &{Lesson: Lesson[] &{ userProgress: UserProgress[]}}};
nextLesson: Lesson & {chapter: Chapter};
prevLesson: Lesson & {chapter: Chapter};
userProgress: UserProgress;
courseId: string;
isLocked: boolean;
completeOnEnd: boolean | undefined;
playbackId: string ;
}

const buttons = [
  {
   'title': 'Information',
   icon: Info,
  },

  {
    'title': 'Resources',
    icon: Paperclip,
   },
   {
    'title': 'Reviews',
    icon: MessageCircleIcon,
   },
   {
    'title': 'Quiz',
    icon: Lock
   },

]
const LessonView = ({
  
  lesson,
  course,
  resources,
  nextLesson,
  prevLesson,
  userProgress,
  courseId,
  isLocked,
  purchase,
  completeOnEnd,
  playbackId
}: Props) => {
  const [isReady, setIsReady]  = useState(false);
  const [click, setClick] = useState('Information');
 const router = useRouter();
 const confetti = useConfettiModal();
 const user = useCurrentUser();
 let reviewSum =  0

 for (const review of course.reviews) {
  reviewSum =  reviewSum + review.rating;
 }
 
 const onvideoEnd = async () => {
  try {
    if (completeOnEnd) {
      await axios.put(`/api/courses/${courseId}/chapters/${lesson.chapterId}/lessons/${lesson.id}/progress`, {
        isCompleted: true
        });
    }
    
    if (!nextLesson) {
      confetti.onOpen();
    }

    toast.success("Your course progress has been updated");
    router.refresh();

    if (nextLesson) {
      router.push(`/student/courses/${courseId}/chapter/${nextLesson.chapterId}/lesson/${nextLesson.id}`, {}, {showProgressBar: true});
    }
  } catch  {
    
  }
 }
  
  return (
 
     <section className="p-4 md:p-8">
        <h2 className="font-semibold"><span className="text-primary">Course</span> 
        <span className=""> &gt; {course.name} </span>
 
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
                accentColor="#007bff"
                 title={lesson.name}
                 className={cn(!isReady && "hidden")}
                 onCanPlay={() => setIsReady(true)}
                 onEnded={onvideoEnd}
                 autoPlay
                 playbackId={playbackId}
                />
              )
            }
        </div>

        <div className="flex flex-col  gap-y-3">
          <div className="flex items-center justify-between gap-5 mb-3">
            <button className="flex items-center justify-center bg-primary/10 text-primary border border-primary w-8 h-8 rounded-full"
              disabled={prevLesson === null ? true: false}
              onClick={() => router.push(`/student/courses/${courseId}/chapter/${prevLesson.chapterId}/lesson/${prevLesson.id}`, {}, {showProgressBar: true})}> 
              <ArrowLeft className=""/>
            
            </button>
          
            <button  className="flex items-center justify-center bg-primary/10 text-primary border border-primary w-8 h-8 rounded-full"
              disabled={nextLesson === null ? true: false}
              onClick={() => router.push(`/student/courses/${courseId}/chapter/${nextLesson.chapterId}/lesson/${nextLesson.id}`, {}, {showProgressBar: true})}>
              <ArrowRight className=""/>
            </button>
        

          </div>
             <div className="flex items-start justify-start">
            <button className="inline  text-sm px-4 py-1 bg-primary/20 rounded-md text-primary">
              {course.category.name}
            </button>
            </div>
            <div className="flex justify-between flex-wrap gap-4">
            <h2 className="text-xl font-semibold max-sm:basis-full">{lesson.name}</h2>
            {
              !purchase && course.paymentStatus !== 'Free' ? 
              <EnrollButton courseId={courseId} price={course.price!}/>
              : <CourseProgressButton
                  nextLesson={nextLesson} 
                  lessonId={lesson.id} 
                  courseId={courseId} 
                  chapterId={lesson.chapterId} 
                  isCompleted={!!userProgress?.isCompleted}/>
            }
           

            </div>
            <div className="flex gap-5 flex-wrap">
              <p className="text-sm">Course by <span className="font-semibold underline">{course.tutor.name}</span></p>
              <p className="flex items-center justify-center gap-2">
              <FontAwesomeIcon  icon={faStar} className='w-4 h-4 text-ranking' />
                <span className="font-semibold text-sm">{course.reviews.length ? (reviewSum / course.reviews.length).toPrecision(2) : 0}
                <span className="font-normal text-sm">({course.reviews.length})</span>
                </span>
                
              </p>
              <p className="flex items-center justify-center gap-3">
              <Signal className="w-4 h-4 text-danger"/>
              <span className="font-medim text-sm">{course.difficulty}</span>
              </p>
              <p className="flex items-center justify-center gap-3">
              <Users2 className="w-4 h-4 text-purple"/>
              <span className="font-medim text-sm">{course.orders.length == 0 ? 0 : course.orders.length} students</span>
              </p>

              
            </div>

            <div className="flex items-start justify-start gap-3 flex-wrap">
                
                {
                  buttons.map((button) => (
                    <Button onClick={() => setClick(button.title)} key={button.title}  variant={click ? 'default': 'outline'}  className={`${click !== button.title && 'bg-white text-gray border-white hover:bg-white/90' } `}>
                      <button.icon  className="w-4 h-4 mr-2"/>
                      { button.title}
                  </Button>
                  ))
                }
               


            </div>
            <div className="flex flex-col mt-2">
              {
                click === 'Information' &&

                <>
                  <h2 className="font-bold">About Course</h2>
                  <div className="quill">
                    <div className="ql-container ql-bubble">
                    <div className="desc mt-2 ql-editor  !leading-[1.5] !text-[16px]" dangerouslySetInnerHTML={{__html: String(course.description)}}/>
                  </div>

                  </div>

                  <h2 className="font-bold">Chapter description</h2>
                  <div className="quill">
                    <div className="ql-container ql-bubble">
                    <div className="desc mt-2 ql-editor  !leading-[1.5] !text-[16px]" dangerouslySetInnerHTML={{__html: String(lesson.chapter.description)}}/>
                  </div>

                  </div>
                </>
              }
              {
                click === 'Resources' && 
                (
                resources.length > 0 ? 
                  <div>
                    <h2 className="font-bold">Useful material for this course</h2>
                    {
                      resources.map((resource) => (
                        <a href={resource.url}
                          target="_blank"
                          key={resource.id}
                          className="flex items-center  p-3 hover:underline"
                          >
                            <File className="w-4 h-4 mr-2"/>
                            <p className="line-clamp-1 text-sm">
                              {
                                resource.name
                              }
                            </p>

                          </a>
                      ))
                    }
                  </div>  : 

                  <div>
                    
                   <h2 className="font-bold">No material was provided for this course</h2>
                  </div>
                )
                 
              }
             
              {
                click === 'Reviews' && 
                <>
                <ReviewCreation 
                  
                  courseId={courseId}  
                  reviews={course.reviews.filter((review) => review.reviewerId === user?.id && courseId === review.courseId)[0]}/>

                <AllReviews reviews={course.reviews} />
              </>
              } {
                click === 'Quiz' && 
                <>
                  <QuizButton chapter={lesson.chapter}/>
                </>
              }

            </div>

        </div>

    </section>
   
  )
}

export default LessonView