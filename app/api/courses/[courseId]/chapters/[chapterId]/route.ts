import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
     {params}: {params: {courseId: string, chapterId: string}}
    ) {

        try {
            const role = await currentRole();
            const user = await currentUser();
            const {isAvailable, ...values} = await req.json();
            
         if (!user) {
            return new NextResponse("Unauthorized", {status: 401});
         };

         if (role !== 'TUTOR') {
            return new NextResponse("Forbidden", {status: 403})
         };

         const ownCourse = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                tutorId: user.id
            }
         });

         if (!ownCourse) {
            return new NextResponse("Forbidden", {status: 403})
         };

         const chapter = await prismadb.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                ...values
            }
         });
         return NextResponse.json(chapter)
            
        } catch (error) {
            console.log('[CHAPTER_PATCH]', JSON.stringify(error))
        return new NextResponse("Internal Error", {status:500})
            
        }
} 