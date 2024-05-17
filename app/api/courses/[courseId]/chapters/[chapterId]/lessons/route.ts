import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
     {params}: {params: {courseId: string, chapterId: string}}
    ) {

        try {
            const role = await currentRole();
            const user = await currentUser();
            const {name} = await req.json();

            
         if (!user) {
            return new NextResponse("Unauthorized", {status: 401});
         };

         if (role !== 'TUTOR') {
            return new NextResponse("Forbidden", {status: 403});
         };

         const courseChapterOwner = await prismadb.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }      
         });

         if (!courseChapterOwner) {
            return new NextResponse("Forbidden", {status: 403})
         }

         
         const lastLesson = await prismadb.lesson.findFirst({
            where: {
                chapterId: params.chapterId
            },
            orderBy: {
                position: 'desc'
            }
         });

         const position = lastLesson ? lastLesson.position + 1 : 1;

         const lesson = await prismadb.lesson.create({
                data: {
                    name,
                    position,
                    chapterId: params.chapterId
                }
         });
         return NextResponse.json(lesson)
            
        } catch (error) {
            console.log('[LESSON_POST]', error)
        return new NextResponse("Internal Error", {status:500})
            
        }
}