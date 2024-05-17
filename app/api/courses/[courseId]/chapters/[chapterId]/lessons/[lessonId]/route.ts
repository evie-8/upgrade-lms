import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
     {params}: {params: {courseId: string, chapterId: string, lessonId: string}}
    ) {

        try {
            const role = await currentRole();
            const user = await currentUser();
            const {IisFree, ...values} = await req.json();
            
         if (!user) {
            return new NextResponse("Unauthorized", {status: 401});
         };

         if (role !== 'TUTOR') {
            return new NextResponse("Forbidden", {status: 403})
         };

         const ownChapter = await prismadb.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
         });

         if (!ownChapter) {
            return new NextResponse("Forbidden", {status: 403})
         };

         const lesson = await prismadb.lesson.update({
            where: {
                id: params.lessonId,
                chapterId: params.chapterId
            },
            data: {
                ...values
            }
         });
         return NextResponse.json(lesson)
            
        } catch (error) {
            console.log('[LESSON_PATCH]', JSON.stringify(error))
        return new NextResponse("Internal Error", {status:500})
            
        }
} 