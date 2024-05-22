import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { QuizShema } from "@/schemas";
import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
    try {
        const user = await currentUser();
        const role = await currentRole();
        const body = await req.json();
        const validatedData = await QuizShema.safeParse(body);
        if (!user) {
            return new NextResponse("Unauthorized", {status: 401});
         };

         if (role !== 'TUTOR') {
            return new NextResponse("Forbidden", {status: 403})
         };

         if (!validatedData.success) {
            return new NextResponse("Invalid data", {status: 400});
         }
      
        const {topic, length, difficulty, name} = validatedData.data;
      
        const response = await axios.get("https://quizapi.io/api/v1/questions", {
            params : {
                apiKey: process.env.QUIZ_API_KEY,
                limit: Number(length),
                difficulty: difficulty,
                tags: topic
            }
        });
 ``
        const transformQuestion = (question: any) => {
            let options: any = {};

            if (question.answers) {
                for (const key in question.answers) {
                    if (question.answers[key] !== null) {
                        options[key] = question.answers[key];
                    }
                }
            }
            const correctAnswerKey = Object.keys(question.correct_answers).find(key => question.correct_answers[key] === 'true');
            //@ts-ignore
            const correctAnswer = correctAnswerKey.replace('_correct', '');
           
            return {
                question: question.question,
                answer: correctAnswer,
                options: options,
            }
        }

        const transformedQuestions = response.data.map(transformQuestion);

        const quiz = await prismadb.quiz.create({
            data: {
                name,
                topic: topic,
                Question: {
                    createMany: {
                        data: transformedQuestions.map((question: any) => ({
                            question: question.question,
                            answer: question.answer,
                            options: question.options
                        }))
                    }
                }
            },
           
        });

        
        return NextResponse.json(quiz);
    } catch (error) {
        console.error('[QUESTION_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

