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
            const {isDraft} = await req.json();
            
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

         const lesson = await prismadb.lesson.findUnique({
            where: {
                id: params.lessonId,
                chapterId: params.chapterId
            },
           
         });

             const existingMuxData = await prismadb.muxData.findFirst({
                where: {
                    lessonId: params.lessonId
                }
            });

            if (isDraft) {
                if (!lesson || !existingMuxData || !lesson.name || !lesson.videoUrl) {
                    return new NextResponse("Missing required fields", {status: 400})
                };

                const publishedLesson = await prismadb.lesson.update({
                    where: {
                        id: params.lessonId,
                        chapterId: params.chapterId
                    }, data: {
                        isDraft: false
                    }
                });
                return NextResponse.json(publishedLesson);
            } else {
                const unpublishedLesson = await prismadb.lesson.update({
                    where: {
                        id: params.lessonId,
                        chapterId: params.chapterId
                    }, data: {
                        isDraft: true
                    }
                });

                const publishedLessonsInChapter = await prismadb.lesson.findMany({
                    where: {
                        chapterId: params.chapterId,
                        isDraft: false,
                    }
                 });
        
                 if (!publishedLessonsInChapter.length) {
                    await prismadb.chapter.update({
                        where: {
                            id: params.chapterId
                        },
                        data: {
                            isAvailable: false
                        }
                    })
                 }
                return NextResponse.json(unpublishedLesson);

            }


         

         
            
        } catch (error) {
            console.log('[LESSON_PATCH_PUBLISH]', JSON.stringify(error))
        return new NextResponse("Internal Error", {status:500})
             
        }
} 