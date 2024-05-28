import QuizPreview from "@/components/admin/quizzes/quiz-preview"
import MetaData from "@/components/ui/meta-data"
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
   <>
     <MetaData title='upgrade-admin | Quizpreviview' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
   
   <QuizPreview data={data}/>
   </>
  
   
  )
}

export default QuizIdPage