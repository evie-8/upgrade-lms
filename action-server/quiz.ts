"use server";

import prismadb from "@/lib/db";

export const getQuizProgress = async(userId: string, quizId: string) => {
    try {
        const quizProgress = await prismadb.quizProgress.findUnique({
            where: {
                userId_quizId: {
                    quizId: quizId,
                    userId: userId
                }
            }
        });
        return quizProgress
        
    } catch  {
        return null;
        
    }
}