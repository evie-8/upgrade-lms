import { IconTag } from "@/components/ui/icon";
import { currentUser } from "@/lib/auth"
import prismadb from "@/lib/db";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "@/components/admin/courses/title-form";
import DescriptionForm from "@/components/admin/courses/description-form";
import ImageForm from "@/components/admin/courses/image-form";
import CategoryForm from "./category-form";
import PriceForm from "./price-form";
import ResourcesForm from "./resources-form";
import ChapterForm from "./chapter-form";
import Container from "@/components/ui/container";
import { Chapter, Lesson } from "@prisma/client";
import { AlertBanner } from "@/components/ui/alert-banner";
import CourseActions from "./course-actions";
 
interface Props {
    courseId: string
}

const CourseId: React.FC<Props> = async ({courseId}) => {
  const user = await currentUser();
  const course = await prismadb.course.findUnique({
    where: {
        id:courseId,
        tutorId: user?.id
    }, 
    include: {
      resources: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      chapter: {
        include: {
          Lesson: true
        },
        orderBy: {
          position: 'asc',
          
        }
      }
    }
  });

  const categories = await prismadb.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  
  if (!course) {
    return redirect("/tutor/courses");
  };
  
  const requiredFields  = [
    course.name,
    course.description,
    course.categoryId,
    course.price?.toString(),
    course.imageUrl,
   course.chapter.some(chapters => chapters.isAvailable)
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const hasEmptyURL = course.chapter.some(chapter => chapter.Lesson.some(lesson => !lesson.videoUrl));
  const isComplete = requiredFields.every(Boolean)

    return (
      <>
      {!course.isAvailable && hasEmptyURL ? (
                <AlertBanner
                    className='sticky top-[73px] z-10'
                    variant={'warning'}
                    label={'This course is unpublished and contains chapters with empty lessons.'}
                />
            ) : hasEmptyURL ? (
                <AlertBanner
                    className='sticky top-[73px] z-10'
                    variant={'warning'}
                    label={'This course c contains chapters with lessons which have empty URLs'}
                />
            ) : !course.isAvailable ? (
                <AlertBanner
                    className='sticky top-[73px] z-10'
                    variant={'warning'}
                    label={'This course is not available yet. It will not be visible to students'}
                />
            ) : null}

   <Container>
     <div className="flex justify-between">
        <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">Course setup</h1>
            <span className="text-sm text-gray/60">Completed fields {`(${completedFields}/${totalFields})`}</span>
        </div>
        <CourseActions isAvailable={course.isAvailable} courseId={courseId} disabled={!isComplete}/>
    </div>
    {/**heading customization */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
        <div>
            <div className="flex items-center gap-x-2">
                <IconTag icon={LayoutDashboard}/>
                <h2 className="font-medium">Customise your course</h2>

            </div>
              {/**title */}
                <TitleForm data={course}/>
                <DescriptionForm data={course}/>
                <ImageForm data={course}/>
                <CategoryForm data={course} 
                options={categories.map((category) => ({label: category.name, value: category.id}))}/>
           </div>

        <div className="space-y-6">
        <div>
            <div className="flex items-center gap-x-2">
                <IconTag icon={ListChecks}/>
                <h2 className="font-medium">Course Chapters</h2>

            </div>
           <ChapterForm data={course}/>
        </div>

        {/**price */}
        <div>
          <div className="flex items-center gap-x-2">
                  <IconTag icon={CircleDollarSign}/>
                  <h2 className="font-medium">Sell your course</h2>
            </div>
            <PriceForm data={course}/>

        </div>

         {/**Resources */}
        <div >
          <div className="flex items-center gap-x-2">
                  <IconTag icon={File}/>
                  <h2 className="font-medium">Resources & Attachments</h2>
            </div>
           <ResourcesForm data={course}/>
        </div>
       

        </div>
       
    </div> 

   </Container>
   </>
  )
}

export default CourseId