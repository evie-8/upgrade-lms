import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
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

         const chapter = await prismadb.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
           
         });

         if (!chapter) {
            return new NextResponse("Not found", {status: 404})
         }

         const deleteChapter = await prismadb.chapter.delete({
            where: {
                id: params.chapterId
            }
         });
         const publishedChaptersInCourse = await prismadb.chapter.findMany({
            where: {
                courseId: params.courseId,
                isAvailable: true
            }
         });

         if (!publishedChaptersInCourse.length) {
            await prismadb.course.update({
                where: {
                    id: params.courseId
                },
                data: {
                    isAvailable: false
                }
            })
         }

         return NextResponse.json(deleteChapter)
            
        } catch (error) {
            console.log('[CHAPTER_DELETE]', JSON.stringify(error))
        return new NextResponse("Internal Error", {status:500})
            
        }
} 

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