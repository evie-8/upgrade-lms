"use client";


import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Chapter, Course, Question, Quiz, QuizProgress } from "@prisma/client";
import axios from "axios";
import { ArrowLeft, ArrowRight,  Timer,  } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { formatDuration } from "../courses/video-duration";

interface Props {
    quiz: Quiz & {Question: Question[] } & {Chapter: Chapter & {courses: Course} };
}

const QuizPreview: React.FC<Props> = ({ quiz }) => {

    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedChoices, setSelectedChoices] = useState<number[] | any>(Array(quiz?.Question.length).fill(null));
    const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(quiz.Question.length).fill(""));
    const [time, setTime] = useState(0);
    const quizDuration = Number(quiz.duration) * 60;
    const [timerRunning, setTimerRunning] = useState(false);
    const [display, setDisplay] = useState(false);
     const router = useRouter();



    const currentQuestion = useMemo(() => {
        return quiz?.Question[questionIndex];
    }, [questionIndex, quiz?.Question]);

    const options = useMemo(() => {
        if (!currentQuestion) return [];
        if (!currentQuestion.options) return [];

        return Object.values(currentQuestion.options);
    }, [currentQuestion]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timerRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timerRunning && time === 0) {
            handleFinish();
        }

        return () => clearInterval(interval);
    }, [timerRunning, time]);
   
   
    const handleChoiceClick = (index: number, option: any) => {
        setSelectedChoices((prev: any) => {
            const updatedChoices = [...prev];
            if (updatedChoices[questionIndex] === index) {
                // If the clicked option is already selected, deselect it
                updatedChoices[questionIndex] = null;
            } else {
                // Otherwise, select the clicked option
                updatedChoices[questionIndex] = index;
            }
            return updatedChoices;
        });

        setSelectedOptions((prev:any) => {
            const options = [...prev];
            if (options[questionIndex] === option) {
                options[questionIndex] = '';
            } else {
                options[questionIndex] = option
            }

          return options;
        });
    };

    const handleStart = () => {
      
        setTime(quizDuration);
        setTimerRunning(true);
        setDisplay(false)
    };

    const handleFinish = async () => {
        let correct = 0;
        let wrong = 0;
        let unanswered = 0;
      
        setTimerRunning(false);
        selectedOptions.map((opt, i) => {
            //@ts-ignore
            if (opt === quiz.Question[i].options[quiz.Question[i].answer]) {

              correct ++;
            } else if (opt === "") {
                unanswered++
            } else {
                wrong ++;
            }
           
        });    
        
        try {
            await axios.post(`/api/quizzes/${quiz.id}/progress`, {
                scores: {
                  correct: correct,
                  wrong: wrong,
                  unanswered: unanswered, 
                  time: formatDuration(quizDuration - time), 
                },
                isComplete: true,
            });

            toast.success("You have completed the quiz");
            router.push("/student/quizzes", {}, {showProgressBar: true});
            
        } catch (error) {
            toast.error("Something went wrong");
            
        } finally {
          
            setSelectedChoices(Array(quiz?.Question.length).fill(null)); 
            setSelectedOptions(Array(quiz.Question.length).fill(""));
            setTime((prev) => quizDuration - prev);
            setQuestionIndex(0);
            setDisplay(true);

        }
        
    };

    const progress = (selectedOptions.filter(opt => opt !== "").length / quiz.Question.length) * 100;

    return (
   
        <>
        
        <div className="sticky top-[71px] z-10 w-full p-2  px-4 bg-white1 mb-2 flex flex-col">
            { timerRunning &&
                    <Progress className=" w-full h-2 bg-white mb-2" value={progress}/>
            }
            <div className="flex  flex-col  md:flex-row md:justify-between md:items-center">
               <div className="">
                    <h2 className="font-bold"> 
                        <span className="text-primary ">Course &gt; </span>
                        {quiz.Chapter.courses.name} &gt;
                        <span className="text-primary">Chapter  &gt; </span>
                        {quiz.Chapter.name} &gt; 
                        <span className="text-primary"> Quiz &gt; </span>
                        {quiz.name} 
                    </h2>
               </div>
               <div>
               {timerRunning ? (
                   <div className="flex items-end gap-2 w-full mt-3">
                    <button
                       className="button1"
                       onClick={() => setQuestionIndex(prev => prev - 1)}
                       disabled={questionIndex < 1 }
                   >
                       <ArrowLeft className="w-5 h-5 mr-2" />
                       <span>Prev</span>
                   </button>

                    {

                    questionIndex ===   quiz.Question.length - 1 ? 
                    <button className="button1" onClick={handleFinish}>
                        Finish Quiz
                    </button> :
                   <button
                       className="button1"
                       onClick={() => setQuestionIndex(prev => prev + 1)}
                       disabled={questionIndex >= quiz.Question.length - 1 }
                   >
                       <span>Next</span>
                       <ArrowRight className="w-5 h-5 ml-2" />
                   </button>

                    }
               
               
               </div>
                    ) : (
                    <button className="button1" onClick={handleStart}>
                    Start Quiz
                    </button>
                    )}
               </div>
            </div>

            <div className="flex items-center mt-2 md:mt-0 justify-between">
                    
                    <div className="flex items-center justify-center gap-1">
                    
                        {
                            !display && 
                            <>
                        <Timer size={20} className="text-primary ml-3" /> <span>Quiz Duration:</span>
                            <p className="my-auto text-sm">{timerRunning ? timeFormatter(time) : timeFormatter(quizDuration)}</p>
                        </> 
                        }
                        
                        <>
                        <p className={`my-auto text-sm  gap-2 ${display ? 'flex': 'hidden'}`} ><span>Quiz completed in</span> {formatDuration(time)}</p>
                        </>
                    
                    </div>
                </div>
        </div>

        <div className="p-3">
            <section className="md:max-w-xl mx-auto h-full">
            
              
                {/**Question */}
                <Card className="w-full mt-4 border-transparent shadow-xs bg-white">
                    <CardHeader className="flex flex-row items-center">
                        <CardTitle className="mr-5 text-center divide-y divide-grey">
                            <div>{questionIndex + 1}</div>
                            <div className="text-base">
                                {quiz?.Question.length}
                            </div>
                        </CardTitle>
                        <CardDescription className="flex-grow text-lg  text-gray/60">
                            {currentQuestion?.question}
                        </CardDescription>
                    </CardHeader>

                </Card>

                    {/* options*/}
                <div className="flex flex-col items-center justify-center w-full mt-4">
                    {options.map((option:any, i: number) => (
                        <button
                        disabled={timerRunning ? false : true} 
                            onClick={() => handleChoiceClick(i, option)}
                            key={i}
                            className={`${selectedChoices[questionIndex] === i ? 'button1 ' : 'button2'} whitespace-normal rounded-lg justify-start w-full h-full mb-4`}
                        >
                            <div className="flex items-center justify-start">
                                <div className={`p-2 px-4 mr-5 border rounded-md ${selectedChoices[questionIndex] === i ? 'border-white': 'border-grey'}`}>
                                    {i + 1}
                                </div>
                                <div className="text-start text-base font-normal">{option}</div>
                            </div>
                        </button>
                    ))}   
                
                </div>

                
            </section>
        </div>
        </>
        
      
      
    );
};

// Function to format time in mm:ss format
const timeFormatter = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default QuizPreview;
