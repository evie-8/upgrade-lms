import ViewQuizzes from "@/components/student/view-quizzes";
import { currentUser } from "@/lib/auth"
import prismadb from "@/lib/db"

const Quizzes = async () => {
  const user = await currentUser();
  const quizProgresses = await prismadb.quizProgress.findMany({
    where: {
      userId: String(user?.id)
    },
    include: {
      quiz:
       {
        include: {
          Question: true
        }
       }
    },
   
  })
  return (
    <ViewQuizzes quizProgresses={quizProgresses}/>
  )
}

export default Quizzes