import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";


export async function PATCH(
    req: Request,
     {params}: {params: {courseId: string}}
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
                tutorId:user.id
            }
         });

         if (!ownCourse) {
            return new NextResponse("Not found", {status: 404});
         };
         const course = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                tutorId: user.id
            },
            include:{
                chapter: {
                    include: {
                        Lesson: true
                    }
                }
            }
           
         });


         if (isAvailable) {
            const unpublishedCourse = await prismadb.course.update({
                where: {
                    id: params.courseId,
                    tutorId: user.id
                }, data: {
                    isAvailable: false
                }
            });

            return NextResponse.json(unpublishedCourse);
         } else {
            if (!course?.name ||
                !course?.description ||
                !course.imageUrl ||
                !course.categoryId ||
                !course.price?.toString()||
                !course.chapter.some((chapterItem) => chapterItem.isAvailable) ) {
                return new NextResponse("Missing required fields", {status: 400})
                
            } 
            const publishedCourse = await prismadb.course.update({
                where: {
                    id: params.courseId,
                    tutorId: user.id
                },
                data: {
                    isAvailable: true
                }
            });
            return NextResponse.json(publishedCourse);

         }
      
            
        } catch (error) {
            console.log('[COURSE_PUBLISH]', error)
        return new NextResponse("Internal Error", {status:500})
            
        }
}