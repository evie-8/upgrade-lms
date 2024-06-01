"use client";

import { Button } from '../ui/button'

import { useRouter } from 'next-nprogress-bar';
import { Chapter, Lesson, Quiz, UserProgress } from '@prisma/client';
import { CheckCircle, HelpCircle, Lock } from 'lucide-react';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useEffect, useState } from 'react';
import { getQuizProgress } from '@/action-server/quiz';

interface Props {
  chapter: Chapter & {quiz: Quiz} & {Lesson: Lesson[] & {userProgress: UserProgress[] | null} | null} | null;
}


const QuizButton = ({chapter}: Props) => {

  const [quizDone, setQuizDone] = useState(false);
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    const quizIsAlreadydone = async () => {
      const quizProgress = await getQuizProgress(String(user?.id), String(chapter?.quizId));

      if (quizProgress) {
        setQuizDone(true);
      } else {
        setQuizDone(false);
      }
    }

    quizIsAlreadydone()
  }, 
[chapter?.quizId, user?.id])
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
                        
                         quizDone ?  
                         <Button className='pointer-events-none' variant={'success'} >
                            <CheckCircle className='h-4 w-4 mr-2'/>
                           You have already attempted this quiz. 
                        </Button> : 
                        (
                         allLessonsCompleted ?
                        <Button onClick={onclick} variant={'default'}>
                        <HelpCircle className='h-4 w-4 mr-2'/>
                       Quiz has been unlocked. Proceed to chapter quiz. 
                    </Button>
                         :
        
                        <Button className='pointer-events-none' variant={'destructive'}>
                        <Lock className='h-4 w-4 mr-2'/>
                        Quiz is locked. Finish all lessons in this chapter to do the quiz
                        </Button>
                        )
                }
            </>
          )
    } 

    return null;
 }
}

export default QuizButton