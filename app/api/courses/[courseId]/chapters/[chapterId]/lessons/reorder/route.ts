import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
     {params}: {params: {courseId: string, chapterId: string}}
    ) {

        try {
            const role = await currentRole();
            const user = await currentUser();
            const {list} = await req.json();

            
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
        
         for (let item of list) {
            await prismadb.lesson.update({
                where: {
                    id: item.id
                },
                data: {
                    position: item.position
                }
            })
         }
         return new NextResponse("Success", {status: 200});  
                   
        } catch (error) {
            console.log('[LESSON_REORDER_PUT]', error)
        return new NextResponse("Internal Error", {status:500});
            
        }
}