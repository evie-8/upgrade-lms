
import { Progress } from "@/components/ui/progress"
import SideBarItem from "@/components/student/sidebar-item";
import prismadb from "@/lib/db";
import { currentUser } from "@/lib/auth";
import getProgress from "@/action-server/get-progress";

const CourseSidebar = async ({course}: {course: any}) => {

  const user = await currentUser();
  const purchased = await prismadb.order.findUnique({
    where: {
     userId_courseId: {
      userId: String(user?.id),
      courseId: course.id
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
  
  const progressData = await getProgress(String(user?.id), course.id);
  return (

    <div className="max-lg:hidden h-full bg-white p-4 overflow-y-auto w-full">
        <h2 className="font-bold text-lg w-full">Your Courses Progress</h2>
        <div className="p-4 rounded-md border-border-transparent bg-primary/10 my-4 flex flex-col gap-3 ">
            <p className="flex justify-between  text-xs">
                <span className="font-bold">{progressData.percentageCompleted}%</span>
                <span><span className="font-bold">{progressData.completedLessons}</span>/{numberOfLessons} lessons</span>
            </p>
            <Progress value={progressData.percentageCompleted} className="h-2 bg-white w-full"/>

        </div>

        <div className="my-4 w-full">
        <h2 className="font-bold text-lg">Chapters & Lessons</h2>
        {
          course.chapter && course.chapter.length && 

          course.chapter.map((item: any) => (
            <SideBarItem key={item.id}  chapter={item} isLocked={!item.isFree && !purchased }/>
          ))
        }
        </div>
    </div>
  )
}

export default CourseSidebar;