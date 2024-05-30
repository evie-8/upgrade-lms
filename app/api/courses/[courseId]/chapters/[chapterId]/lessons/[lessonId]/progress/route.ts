import { currentUser } from "@/lib/auth"
import prismadb from "@/lib/db";
import { NextResponse } from "next/server"

export async function PUT(req: Request, 
    {params}: {params: {lessonId: string, chapterId: string, courseId: string}}
) {

    try {
        const user  = await currentUser();
        const {isCompleted} = await req.json();

        if (!user) {
            return new NextResponse("Unauthenticated", {status: 401})
        };

        const userProgress = await prismadb.userProgress.upsert({
            where: {
                userId_lessonId: {
                    userId: String(user.id),
                    lessonId: params.lessonId
                }
            },

            update: {
                isCompleted: isCompleted
            },
            create: {
                userId: String(user.id),
                lessonId: params.lessonId,
                isCompleted: isCompleted
            }
        });

        return NextResponse.json(userProgress);
        
    } catch (error) {
        console.log("[PORGRESS_PUT]", error)
        return new NextResponse("Internal error", {status: 500})
    }

}