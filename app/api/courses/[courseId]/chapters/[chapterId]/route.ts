import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import Mux from "@mux/mux-node";
import { Prisma } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
});

export async function DELETE(
    req: NextApiRequest,
     {params}: {params: {courseId: string, chapterId: string}}
    ) {

        try {
            const role = await currentRole();
            const user = await currentUser();
            
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
                Lesson: {
                    include: {
                        muxData: true
                    }
                }
            }
           
         });

         if (!chapter) {
            return new NextResponse("Not found", {status: 404})
         }

         for (const lesson of chapter.Lesson) {
            if (lesson.muxData?.assetId) {
                await mux.video.assets.delete(lesson.muxData.assetId);
               
            }
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
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                  console.log("prisma", error.message)
                }
              }
            
          
            console.log('[CHAPTER_DELETE]', error);
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
            const {isAvailable, quizId, ...values} = await req.json();
            
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
                ...values,
                quizId: quizId && quizId.length > 0 ? quizId : null,
            }
         });

        
         return NextResponse.json(chapter)
            
        } catch (error) {
            console.log('[CHAPTER_PATCH]', JSON.stringify(error))
        return new NextResponse("Internal Error", {status:500})
            
        }
} 