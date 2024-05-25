"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check,  HelpCircle, Timer, X } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

interface Props {
    data: any
}

const QuizPreview: React.FC<Props> = ({ data }) => {

    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedChoices, setSelectedChoices] = useState<number[] | any>(Array(data?.Question.length).fill(null));
    const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(data.Question.length).fill(""));
    const [time, setTime] = useState(0);
    const quizDuration = data.duration * 60;
    const [timerRunning, setTimerRunning] = useState(false);
    const [score, setScore] = useState({correct: 0, wrong: 0, unanswered: 0});
    const [display, setDisplay] = useState(false);
   


    const currentQuestion = useMemo(() => {
        return data?.Question[questionIndex];
    }, [questionIndex, data?.Question]);

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
        setScore({correct: 0, wrong: 0, unanswered:0});
        setDisplay(false)
    };

    const handleFinish = () => {
        let correct = 0;
        let wrong = 0;
        let unanswered = 0;
      
        setTimerRunning(false);
        selectedOptions.map((opt, i) => {
            if (opt === data.Question[i].options[data.Question[i].answer]) {

              correct ++;
            } else if (opt === "") {
                unanswered++
            } else {
                wrong ++;
            }
           
        });     
        setScore({correct, wrong, unanswered});
        setSelectedChoices(Array(data?.Question.length).fill(null)); 
        setSelectedOptions(Array(data.Question.length).fill(""));
        setDisplay(true);
        setTime((prev) => quizDuration - prev)
        setQuestionIndex(0)

    };

    const progress = (selectedOptions.filter(opt => opt !== "").length / data.Question.length) * 100;

    return (
   

        <Container>
            <section className="md:max-w-xl mx-auto h-full">
            { timerRunning &&
                <Progress className="fixed  top-0 w-1/2 max-md:w-full max-md:left-0 h-2" value={progress}/>
            }
                <div className="flex justify-between mb-8">
                <h2 className="text-2xl font-bold">Quiz Preview</h2>
                {timerRunning ? (
                        <button className="button1" onClick={handleFinish}>
                            End demo
                        </button>
                    ) : (
                        <button className="button1" onClick={handleStart}>
                            Start demo
                        </button>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <p>
                    {/*<span className="text-gray/60 text-sm mx-2">Topics</span>*/}
                        <Badge className="bg-primary/10 text-primary rounded-full font-normal hover">{data.topic ? data.topic : 'no topic'}</Badge>
                    </p>
                    <div className="flex items-center justify-center gap-1  text-gray/60">
                    {
                        timerRunning && 
                        <>
                            <Timer size={20} className="text-primary" />
                        <p className="my-auto text-sm">{timeFormatter(time)}</p>
                        </> 
                        }
                        <>
                                <p className={`my-auto text-sm  gap-2 ${display ? 'flex': 'hidden'}`} ><span>completed in:</span> {timeFormatter(time)}</p>
                            </>
                    
                    </div>
                </div>
                {/*results*/}
                { display &&
                <div className="flex items-start justify-start gap-4 mt-3">
                        <button className="bg-success/10 rounded-full px-4 py-1 gap-2 flex"><Check className="text-success font-semibold"/>{score.correct}</button>
                        <button className="bg-danger/10 rounded-full px-4 py-1 gap-2 flex"><X className="text-danger font-semibold"/>{score.wrong}</button>
                        
                        <button className="bg-warning/10 rounded-full px-4 py-1 gap-2 flex"><HelpCircle className="text-warning font-semibold"/>{score.unanswered}</button>
                </div>
                }


                        {/**Question */}
                <Card className="w-full mt-4 border-transparent shadow-xs bg-white">
                    <CardHeader className="flex flex-row items-center">
                        <CardTitle className="mr-5 text-center divide-y divide-grey">
                            <div>{questionIndex + 1}</div>
                            <div className="text-base">
                                {data?.Question.length}
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
                            className={`${selectedChoices[questionIndex] === i ? 'button1 ' : 'button2'} whitespace-normal rounded-lg justify-start w-full py-8 mb-4`}
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

                <div className="flex justify-between w-full mt-3">
                    <button
                        className="button1"
                        onClick={() => setQuestionIndex(prev => prev - 1)}
                        disabled={questionIndex < 1 }
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span>Prev</span>
                    </button>

                    <button
                        className="button1"
                        onClick={() => setQuestionIndex(prev => prev + 1)}
                        disabled={questionIndex >= data.Question.length - 1 }
                    >
                        <span>Next</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </button>

                
                </div>
            </section>
        </Container>
      
      
    );
};

// Function to format time in mm:ss format
const timeFormatter = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default QuizPreview;
