import QuizCreateCard from "@/components/admin/quizzes/quiz-create"
import prismadb from "@/lib/db"


const Quiz = async () => {
  const quizzes = await prismadb.quiz.findMany({
    orderBy: {
      createdAt: 'desc',
    }, include: {
      Question: true,
      Chapter: true
    }
  })
  return (
   
      <QuizCreateCard quizzes={quizzes}/>
     
  )
}

export default Quiz