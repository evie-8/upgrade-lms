import {  Question, Quiz, QuizProgress } from "@prisma/client"
import Container from "@/components/ui/container";

interface Props {

    quizProgresses: (QuizProgress & {quiz: Quiz & {Question: Question[]}})[] | null;
}
const ViewQuizzes = async({quizProgresses}: Props) => {
   
  return (
    <Container>
            <h1 className="text-2xl font-bold">Evaluation Quizzes</h1>

           
                {
                    (quizProgresses?.length  === 0) ?

                   <>
                  
                    <div className="flex p-4 mt-5 rounded-md border border-transparent bg-white1 text-destructive w-full font-medium">
                        No evaluation quizzes yet
                    </div>
                   </>
                    

                :
            <div className="flex mt-5 flex-col rounded-md border border-grey max-w-5xl ">
                {
                    quizProgresses?.map((progress, i) => (
                            <div className={`flex justify-between  p-3  border border-grey ${i < quizProgresses.length - 1 ? 'border-t-transparent border-x-transparent ' : 'border-transparent'}`}>
                                <div className="flex flex-col gap-2 ">
                                    <p className="font-medium text-primary">{progress.quiz.name}</p>
                                    <div className="flex gap-3">
                                        <p className="text-success ">Correct: <span className="text-gray">{progress?.scores?.correct}</span></p>
                                        <p className="text-destructive ">Unanswered: <span className="text-gray">{progress?.scores?.unanswered}</span></p>
                                        <p className="text-warning fo">Wrong: <span className="text-gray">{progress?.scores?.wrong}</span></p>

                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold">Completion time</p>
                                 
                                    <p className="">{progress?.scores?.time}</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p className="font-semibold">Score in %</p>
                                 
                                    <p className="text-destructive">{(progress?.scores?.correct / progress.quiz.Question.length) * 100}%</p>
                                </div>
                            </div>
                    ))
                }

            </div>
}
    </Container>
  )
}

export default ViewQuizzes