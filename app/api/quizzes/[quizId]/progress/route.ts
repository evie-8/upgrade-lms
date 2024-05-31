import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: {params: {quizId: string}}) {
try {
    const user = await currentUser();
    const { scores, isComplete} = await req.json();

    if (!user) {
        return new NextResponse("Unauthneticated", {status: 400})
    };

    const existingQuizProgress = await prismadb.quizProgress.findUnique({
        where: {
            userId_quizId: {
                userId: String(user.id),
                quizId: params.quizId
            }
        }
    });

    if (existingQuizProgress) {
        return new NextResponse("You can attempt quiz only once", {status: 400})
    };

    const quizProgress = await prismadb.quizProgress.create({
        data: {
            quizId: params.quizId,
            userId: String(user.id),
            scores: scores,
            isComplete: isComplete,
        }
    });

    return NextResponse.json(quizProgress);
    
} catch (error) {
    console.log("QUIZ_PROGRESS", error);
    return new NextResponse("Internal error", {status: 500})
}
}