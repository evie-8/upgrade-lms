
import { Progress } from "@/components/ui/progress"
import SideBarItem from "@/components/student/sidebar-item";
import prismadb from "@/lib/db";
import { currentUser } from "@/lib/auth";
import getProgress from "@/action-server/get-progress";
import { Chapter, Course, Lesson, UserProgress } from "@prisma/client";

const CourseSidebar = async ({course}: {course: Course & {chapter: Chapter[] | null & {Lesson: Lesson[] | null & {userProgress: UserProgress[]| null} | null} | null} | null} | null) => {

  const user = await currentUser();
  const purchased = await prismadb.order.findUnique({
    where: {
     userId_courseId: {
      userId: String(user?.id),
      courseId: String(course.id),
     }
    }
  });

  let numberOfLessons = 0;

  for (const chapter of course.chapter) {
    for (const lesson of chapter.Lesson) {
     if (lesson) {
      numberOfLessons = numberOfLessons + 1;
     }
    }
  }
  
  const {completedLessons, percentageCompleted} = await getProgress(String(user?.id), course.id);
  return (

    <div className="max-lg:hidden h-full bg-white p-4 overflow-y-auto w-full">
        <h2 className="font-bold text-lg w-full">Your Courses Progress</h2>
        <div className="p-4 rounded-md border-border-transparent bg-primary/10 my-4 flex flex-col gap-3 ">
            <p className="flex justify-between  text-xs">
                <span className="font-bold">{Math.round(percentageCompleted)}%</span>
                <span><span className="font-bold">{completedLessons}</span>/{numberOfLessons} lessons</span>
            </p>
            <Progress variant={percentageCompleted === 100 ? 'success': 'default'} value={Math.round(percentageCompleted)} className="h-2 bg-white w-full"/>

        </div>

        <div className="my-4 w-full h-full">
        <h2 className="font-bold text-lg">Chapters & Lessons</h2>
        {
          course.chapter && course.chapter.length && 

          course.chapter.map((item: Chapter & {Lesson: Lesson[] & {userProgress: UserProgress[]| null}}) => (
            <SideBarItem key={item.id}  chapter={item} isLocked={!item.isFree && !purchased }/>
          ))
        }
        </div>
    </div>
  )
}

export default CourseSidebar;