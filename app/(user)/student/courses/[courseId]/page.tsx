import prismadb from "@/lib/db";
import { redirect } from "next/navigation";

const CoursePage =  async ({params}: {params: {courseId: string}}) => {
  
  const course = await prismadb.course.findUnique({
    where: {
      id: params.courseId
    },
    include: {
      chapter: {
        where: {
          isAvailable: true
        },
        orderBy: {
          position: 'asc'
        },

        include: {
          Lesson: {
            where: {
              isDraft: false
            },
            orderBy: {
              position: 'asc'
            }
          }
        }
      }
    }
  });  

  if (!course) {
    return redirect("/student/dashboard")
  }
  return  redirect(`/student/courses/${course.id}/chapter/${course.chapter[0].id}/lesson/${course.chapter[0].Lesson[0].id}`)
}

export default CoursePage; 