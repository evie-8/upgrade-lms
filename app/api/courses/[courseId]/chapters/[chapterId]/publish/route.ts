import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
     {params}: {params: {courseId: string, chapterId: string}}
    ) {

        try {
            const role = await currentRole();
            const user = await currentUser();
            const {isAvailable} = await req.json();
            
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
            }, include: {
                Lesson:true
            }
         });

         if (isAvailable) {
            const unpublishedChapter = await prismadb.chapter.update({
                where: {
                    id: params.chapterId,
                    courseId: params.courseId
                }, data: {
                    isAvailable: false
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
             };

             return NextResponse.json(unpublishedChapter);
         } else {
            if (!chapter ||
                 !chapter.name ||
                 !chapter.description || 
                 !chapter.Lesson.length || 
                 !chapter.Lesson.filter((lesson) => !lesson.isDraft).length || 
                 chapter.Lesson.some((lesson) => !lesson.isDraft && !lesson.videoUrl)) {
                return new NextResponse("Missing required fields", {status: 400})
            } 

            const publishedChapter = await prismadb.chapter.update({
                where: {
                    id: params.chapterId,
                    courseId: params.courseId
                }, data: {
                    isAvailable: true
                }
            });

            return NextResponse.json(publishedChapter)
         }
             
            
        } catch (error) {
            console.log('[CHAPTER_PATCH_PUBLISH]', JSON.stringify(error))
        return new NextResponse("Internal Error", {status:500})
            
        }
} 