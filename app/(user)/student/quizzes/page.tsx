import ViewQuizzes from "@/components/student/view-quizzes";
import MetaData from "@/components/ui/meta-data";
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
    <>
     <MetaData title='upgrade-student | All Quizzes' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
     <ViewQuizzes quizProgresses={quizProgresses}/>
    </>
    
  )
}

export default Quizzes