import QuizPreview from "@/components/student/quiz-page"
import MetaData from "@/components/ui/meta-data";
import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/db"
import { redirect } from "next/navigation";

const StudentQuizPage = async ({params}: {params: {quizId: string}}) => {

  const user = await currentUser();
  const quizProgress = await prismadb.quizProgress.findUnique({
    where: {
      userId_quizId: {
        quizId: params.quizId,
        userId: String(user?.id),
      }
    }
  })

    const quiz = await prismadb.quiz.findUnique({
        where: {
            id: params.quizId
        },
        include: {
        
            Chapter: {
                include: {
                    courses: true,
                }
            },
            Question: {
              select: {
                question: true,
                options: true,
                answer: true,
              }
            }
          }
    });

    if (quizProgress) {
      
      return redirect("/student/quizzes");

    }
  return (
    <>
    
      <MetaData title='upgrade-student | Quizzes' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
    
        <QuizPreview 
        //@ts-ignore
        quiz={quiz}/>
    </>
  )
}

export default StudentQuizPage