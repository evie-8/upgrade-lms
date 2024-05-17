import QuizPreview from "@/components/admin/quizzes/quiz-preview"
import prismadb from "@/lib/db"

const QuizIdPage =  async ({params}: {params: {quizId: string}}) => {
 const data = await prismadb.quiz.findUnique({
  where: {
    id: params.quizId
  }, 
  include: {
    Question: {
      select: {
        question: true,
        options: true,
        answer: true,
      }
    }
  }
 })
  return (
  
     <QuizPreview data={data}/>
  
   
  )
}

export default QuizIdPage