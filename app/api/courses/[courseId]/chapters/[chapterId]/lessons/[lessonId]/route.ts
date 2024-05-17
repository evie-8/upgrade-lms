import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
});

export async function DELETE(
    req: Request,
     {params}: {params: {courseId: string, chapterId: string, lessonId: string}}
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
         if (!lesson) {
            return new NextResponse("Not found", {status: 404})
         }

         if (lesson.videoUrl) {
            const existingMuxData = await prismadb.muxData.findFirst({
                where: {
                    lessonId: params.lessonId
                }
            });

            if (existingMuxData) {
                await mux.video.assets.delete(existingMuxData.assetId);
                await prismadb.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                })
                }
         };

         const deleteLesson = await prismadb.lesson.delete({
            where: {
                id: params.lessonId
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

         return NextResponse.json(deleteLesson)
            
        } catch (error) {
            console.log('[LESSON_DELETE]', JSON.stringify(error))
        return new NextResponse("Internal Error", {status:500})
            
        }
} 

export async function PATCH(
    req: Request,
     {params}: {params: {courseId: string, chapterId: string, lessonId: string}}
    ) {

        try {
            const role = await currentRole();
            const user = await currentUser();
            const {isFree, ...values} = await req.json();
            
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

         if (values.videoUrl) {
            const existingMuxData = await prismadb.muxData.findFirst({
                where: {
                    lessonId: params.lessonId
                }
            });

            if (existingMuxData) {
                await mux.video.assets.delete(existingMuxData.assetId);
                await prismadb.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                })
            }

            const asset = await mux.video.assets.create({
                input: values.videoUrl,
                playback_policy: ['public'],
                test: false

            });

            await prismadb.muxData.create({
                data: {
                    lessonId: params.lessonId,
                    assetId: asset.id,
                    placybackId: asset.playback_ids?.[0]?.id
                }
            })
         }


         return NextResponse.json(lesson)
            
        } catch (error) {
            console.log('[LESSON_PATCH]', JSON.stringify(error))
        return new NextResponse("Internal Error", {status:500})
            
        }
} 