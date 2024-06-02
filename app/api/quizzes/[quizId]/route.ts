import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE (req: Request, {params}: {params: {quizId: string}}) {
    try {

        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        const quiz = await prismadb.quiz.delete({
            where: {
                id: params.quizId
            }
        });

        return NextResponse.json(quiz)
        
    } catch (error) {
        console.log("[DELETE_QUIZ]", error);
        return new NextResponse("Internal Error", {status: 500})
    }

}