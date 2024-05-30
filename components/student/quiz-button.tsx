"use client";

import { Button } from '../ui/button'
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useRouter } from 'next-nprogress-bar';
import { useRouter as useRouter1 } from 'next/navigation';
import { useConfettiModal } from '@/hooks/use-confetti';
import { Chapter, Lesson, Quiz, UserProgress } from '@prisma/client';
import { HelpCircle, Lock } from 'lucide-react';

interface Props {
  chapter: Chapter & {quiz: Quiz} & {Lesson: Lesson[] & {userProgress: UserProgress[]}};
}

const QuizButton = ({chapter}: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const router1 = useRouter1();
  const confetti = useConfettiModal();

  const finishedLessonsInChapter = chapter.Lesson.filter((lesson) => lesson.userProgress[0]?.isCompleted)

  return (
    <Button onClick={() => {}} variant={finishedLessonsInChapter ? 'default' : 'destructive'}>
        {
            finishedLessonsInChapter ? 
            <>
                <HelpCircle className='h-4 w-4 mr-2'/>
                Start Quiz
            </> :

            <>
            <Lock className='h-4 w-4 mr-2'/>
            Quiz
            </>
        }
    </Button>
  )
}

export default QuizButton