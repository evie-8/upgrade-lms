import { IconTag } from "@/components/ui/icon";
import prismadb from "@/lib/db";
import { ArrowLeft, LayoutDashboard, VideoIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import LessonTitleForm from "./lesson-title-form";
import LessonVideoForm from "./lesson-video-form";
import Container from "@/components/ui/container";
import LessonActions from "./lesson-actions";
import { AlertBanner } from "@/components/ui/alert-banner";

interface Props {
    lessonId: string;
    chapterId: string;
    courseId: string;
}

const LessonIdForm = async ({lessonId, chapterId, courseId}: Props) => {
    const lesson = await prismadb.lesson.findUnique({
        where: {
            id: lessonId,
            chapterId: chapterId
        }, include: {
            muxData: true,
            chapter: true
        }
    });

    if (!lesson) {
        return redirect('/tutor/courses')
    };

    const requiredFields  = [
        lesson.name,
        lesson.videoUrl,    
      
      ];
    
      const totalFields = requiredFields.length;
      const completedFields = requiredFields.filter(Boolean).length;
      const isComplete = requiredFields.every(Boolean);
    

  return (
    <>
    {
        lesson.isDraft &&
        <AlertBanner
        className='sticky top-[73px] z-10'
        variant={'warning'}
        label="This lesson is still a draft and it will not be visible in the chapter section" />
    }
    <Container>
        <div className="flex items-center justify-between">
            <div className="w-full  max-w-3xl">
                    <Link href={`/tutor/courses/${courseId}/chapters/${chapterId}`}
                            className='flex items-center hover:opacity-75 transition mb-6'>
                            
                                <ArrowLeft className='w-4 h-4 mr-2'/>
                                Back to chapter setup
                    </Link>
                    <div className="flex justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-bold">Lesson Creation </h1>
                    <span className="text-sm text-gray/60">Completed fields {`(${completedFields}/${totalFields})`}</span>
          
                </div>
                <LessonActions isDraft={lesson.isDraft} disabled={!isComplete} chapterId={chapterId} courseId={courseId} lessonId={lessonId}/>
            </div>

            </div>

        </div>
        <div className="mt-16 max-w-3xl">
        <div className="flex items-center gap-x-2">
                <IconTag icon={LayoutDashboard}/>
                <h2 className="font-medium">Customise your lesson</h2>

        </div>
        <div className="space-y-6">
            <LessonTitleForm lesson={lesson}/>
            <div>
                <div className="flex items-center gap-x-2">
                    <IconTag icon={VideoIcon}/>
                    <h2 className="font-medium">Add a video</h2>

                </div>
                <LessonVideoForm lesson={lesson}/>
            </div>
           
        </div>
        </div>
    </Container>
    </>
  )
}

export default LessonIdForm