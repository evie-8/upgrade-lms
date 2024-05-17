
import { currentRole, currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { CourseCreationSchema } from "@/schemas";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {

    try {
        const role = await currentRole();
        const user = await currentUser();
         const body = await req.json();
         const validatedData = await CourseCreationSchema.safeParse(body);

         if (!user) {
            return new NextResponse("Unauthorized", {status: 401});
         };

         if (role !== 'TUTOR') {
            return new NextResponse("Forbidden", {status: 403})
         };

         if (!validatedData.success) {
            return new NextResponse("Invalid data", {status: 400});
         }

         const {name, level, payment, combined} = validatedData.data;
         const course = await prismadb.course.create({
            data: {
                tutorId: String(user.id),
                name,
                paymentStatus: payment,
                difficulty: level,
                duration: String(combined),
                price: payment === 'Free' ? 0 : null
            }
         });

         return NextResponse.json(course);
    

    } catch (error) {
        console.log('[COURSE_POST]', JSON.stringify(error))
        return new NextResponse("Internal Error", {status:500})
    }
}

