"use server";
import prismadb from "@/lib/db";

const getProgress = async (userId: string, courseId: string) => {
  try {
   
      
    const publishedChapters = await prismadb.chapter.findMany({
      where: {
        courseId: courseId,
        isAvailable: true,
      },
      select: {
        Lesson: {
          where: {
            isDraft: false,
          },
          select: {
            id: true
          }
        }
      }
    });
    
    const publishedLessonsIds = publishedChapters.flatMap(chapter => chapter.Lesson.map(lesson => lesson.id)); 

    const validCompletedLessons = await prismadb.userProgress.count({
      where: {
        userId: userId,
        lessonId: {
          in: publishedLessonsIds
        },
        isCompleted: true
      }
    });

    const progressPercentage = (validCompletedLessons / publishedLessonsIds.length) * 100;  

    return {completedLessons: validCompletedLessons, percentageCompleted: progressPercentage }
  } catch (error) {
    
    console.log("[GET_PORGRESS]", error);
    return {completedLessons: 0, percentageCompleted:0 }
  }
}

export default getProgress