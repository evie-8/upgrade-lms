import QuizCreateCard from "@/components/admin/quizzes/quiz-create"
import MetaData from "@/components/ui/meta-data"
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
   
  <>
      <MetaData title='upgrade-admin | Quizzes' description='courses offered at upgrade e-learning platform' keywords="programming,alx"/>
   
   <QuizCreateCard quizzes={quizzes}/>
  
  </>
  )
}

export default Quiz