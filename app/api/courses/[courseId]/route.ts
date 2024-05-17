import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

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