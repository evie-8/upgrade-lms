"use client";

import { Button } from '../ui/button'

import { useRouter } from 'next-nprogress-bar';
import { Chapter, Lesson, Quiz, UserProgress } from '@prisma/client';
import { HelpCircle, Lock } from 'lucide-react';

interface Props {
  chapter: Chapter & {quiz: Quiz} & {Lesson: Lesson[] & {userProgress: UserProgress[] | null} | null} | null;
}

const QuizButton = ({chapter}: Props) => {

  const router = useRouter();
  const onclick = () =>  {
    router.push(`/student/quizzes/${chapter?.quizId}`, {}, {showProgressBar: true});
  }
  
  //@ts-ignore
  const allLessonsCompleted = chapter && chapter.Lesson && chapter.Lesson.every((lesson) => lesson.userProgress?.[0]?.isCompleted === true);

 {
    if (chapter?.quiz) {
        return (
            <>
                {
                    allLessonsCompleted ? 
                        <Button onClick={onclick} variant={'default'}>
                            <HelpCircle className='h-4 w-4 mr-2'/>
                           Quiz has been unlocked. Proceed to chapter quiz. 
                        </Button> :
        
                        <Button className='pointer-events-none' variant={'destructive'}>
                        <Lock className='h-4 w-4 mr-2'/>
                        Quiz is locked. Finish all lessons in this chapter to do the quiz
                        </Button>
                }
            </>
          )
    } 

    return null;
 }
}

export default QuizButton