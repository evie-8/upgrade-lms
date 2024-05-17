import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
     {params}: {params: {courseId: string}}
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

         const courseOwner = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                tutorId: user.id
            }      
         });

         if (!courseOwner) {
            return new NextResponse("Forbidden", {status: 403})
         }
         const lastChapter = await prismadb.chapter.findFirst({
            where: {
                courseId: params.courseId
            },
            orderBy: {
                position: 'desc'
            }
         });

         const position = lastChapter ? lastChapter.position + 1 : 1;

         const chapter = await prismadb.chapter.create({
                data: {
                    name,
                    position,
                    courseId: params.courseId,
                    isFree : courseOwner.paymentStatus === 'Free' ? true : false
                }
         });
         return NextResponse.json(chapter)
            
        } catch (error) {
            console.log('[CHAPTER_POST]', error)
        return new NextResponse("Internal Error", {status:500})
            
        }
}