import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
     {params}: {params: {courseId: string, resourceId: string}}
    ) {

        try {
            const role = await currentRole();
            const user = await currentUser();

            
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

         const resource = await prismadb.resource.delete({
            where: {
                id: params.resourceId,
                courseId: params.courseId
            }
         })
         return NextResponse.json(resource)
            
        } catch (error) {
            console.log('[RESOURCES_ID_DELETE]', error)
        return new NextResponse("Internal Error", {status:500})
            
        }
}