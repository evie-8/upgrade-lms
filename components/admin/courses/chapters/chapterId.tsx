import { IconTag } from '@/components/ui/icon';
import { currentUser } from '@/lib/auth';
import prismadb from '@/lib/db';
import { ArrowLeft, Eye, HelpCircle, LayoutDashboard, Video } from 'lucide-react';
import Link from 'next/link';
import { redirect } from "next/navigation";
import React from 'react'
import TitleForm from './chapter-title-form';
import ChapterDescriptionForm from './chapter-description';
import ChapterAccessForm from './access-form';
import ChapterLessonForm from './lesson-form';
import QuizForm from './quiz-form';
import { AlertBanner } from '@/components/ui/alert-banner';
import Container from '@/components/ui/container';
import { Chapter, Lesson } from '@prisma/client';
import ChapterActions from './chapter-actions';

interface Props {
    chapterId: string;
    courseId: string;
}

const ChapterIdCard = async ({chapterId, courseId}: Props) => {
   
    const chapter = await prismadb.chapter.findUnique({
        where: {
            id: chapterId,
            courseId: courseId,
        }, include: {
            Lesson: {
                orderBy: {
                    position: 'asc'
                }
            },
            quiz: true,
            courses: true
        }
    });

    if (!chapter) {
        return redirect("/tutor/courses")
    };

    const quizzes = await prismadb.quiz.findMany({
        where: {
            OR: [
                { Chapter: { id: chapterId } },
                { Chapter: null }
            ]
        }
    });


    const requiredFields  = [
        chapter.name,
        chapter.description,    
       chapter.Lesson.some(lesson => !lesson.isDraft)
      ];
    
      const totalFields = requiredFields.length;
      const completedFields = requiredFields.filter(Boolean).length;
      const isComplete = requiredFields.every(Boolean);
      const hasEmptyURL = chapter.Lesson.some((lesson: any) =>  !lesson.isDraft && !lesson.videoUrl);
       
    

  return (
    <>
  {!chapter.isAvailable && hasEmptyURL ? (
                <AlertBanner
                    className='sticky top-[73px] z-10'
                    variant={'warning'}
                    label={'This chapter is still a draft and contains lessons with empty URLs'}
                />
            ) : hasEmptyURL ? (
                <AlertBanner
                    className='sticky top-[73px] z-10'
                    variant={'warning'}
                    label={'This chapter contains lessons with empty URLs'}
                />
            ) : !chapter.isAvailable ? (
                <AlertBanner
                    className='sticky top-[73px] z-10'
                    variant={'warning'}
                    label={'This chapter is not available yet. It will not be visible under the courses'}
                />
            ) : null}



      <Container>
      <div className='flex items-center justify-between'>
        <div className='w-full'>
            <Link href={`/tutor/courses/${courseId}`}
            className='flex items-center hover:opacity-75 transition mb-6'>
              
                <ArrowLeft className='w-4 h-4 mr-2'/>
                Back to course setup
            </Link>

            <div className="flex justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-bold">Chapter Creation </h1>
                    <span className="text-sm text-gray/60">Completed fields {`(${completedFields}/${totalFields})`}</span>
                </div>
                <ChapterActions chapter={chapter} disabled={!isComplete} isAvailable={chapter.isAvailable} courseId={courseId} chapterId={chapterId}/>
            </div>

        </div>

       </div>

        {/**heading customization */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
        <div className='space-y-6'>
            <div className="flex items-center gap-x-2">
                <IconTag icon={LayoutDashboard}/>
                <h2 className="font-medium">Customise your chapter</h2>  
       
            </div> 
            {/* chapter title*/}
            <TitleForm chapter={chapter}/>
            {/**chapter description */}
            <ChapterDescriptionForm chapter={chapter}/>

              {/**Access */}
                <div>
                    <div className='flex items-center gap-x-2'>
                    <IconTag icon={Eye}/>
                        <h2 className="font-medium">Access settings</h2>  
            
                    </div>
                    {/**settings */}
                    <ChapterAccessForm chapter={chapter}/>
                </div>

        </div>
      


        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-x-2">
                    <IconTag icon={Video}/>
                    <h2 className="font-medium">Chapter Lessons</h2>

                </div>
                {/**lessons */}
                <ChapterLessonForm chapter={chapter}/>
            </div>
            <div>
                <div className="flex items-center gap-x-2">
                    <IconTag icon={HelpCircle}/>
                    <h2 className="font-medium">Chapter Quiz</h2>

                </div>
                {/**quizz */}
                <QuizForm chapter={chapter} options={quizzes.map((quiz) => ({label: quiz.name, value: quiz.id}))}/>
            </div>
            
        </div>
    </div>
      </Container>

    </>
  )
}

export default ChapterIdCard