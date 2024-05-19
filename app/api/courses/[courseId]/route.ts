import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
});


export async function DELETE(
    req: Request,
     {params}: {params: {courseId: string}}
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

         const course = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                tutorId: user.id
            },
            include:{
                chapter: {
                    include: {
                        Lesson: {
                            include: {
                                muxData: true
                            }
                        }
                    }
                }
            }
           
         });

         if (!course) {
            return new NextResponse("Not found", {status: 404});
         };

        if (course.chapter.length) {
            for (const chapterItem of course.chapter) {
                if (chapterItem.Lesson.length) {
                    for(const lesson of chapterItem.Lesson) {
                        if (lesson.muxData) {
                            await mux.video.assets.delete(lesson.muxData.assetId);
                        }
                    }
                }
            }
        }

         const deletedCourse = await prismadb.course.delete({
            where: {
                id: params.courseId,
                tutorId: user.id
            }
         });


         return NextResponse.json(deletedCourse)
            
        } catch (error) {
            console.log('[COURSE_DELETE]', error)
        return new NextResponse("Internal Error", {status:500})
            
        }
}

export async function PATCH(
    req: Request,
     {params}: {params: {courseId: string}}
    ) {

        try {
            const role = await currentRole();
            const user = await currentUser();
            const values = await req.json();
            
         if (!user) {
            return new NextResponse("Unauthorized", {status: 401});
         };

         if (role !== 'TUTOR') {
            return new NextResponse("Forbidden", {status: 403})
         };

         const course = await prismadb.course.update({
            where: {
                id: params.courseId,
                tutorId: user.id
            },
            data: {
                ...values
            }
         });
         return NextResponse.json(course)
            
        } catch (error) {
            console.log('[COURSE_PATCH]', JSON.stringify(error))
        return new NextResponse("Internal Error", {status:500})
            
        }
}