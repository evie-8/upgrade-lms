import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request, 
    {params}: {params: {courseId: string}}
) {
    
    try {
        
        const user = await currentUser();
        if (!user || !user.id || !user.email) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        const course = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                isAvailable: true,
            },
        });

        const purchase = await prismadb.order.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: params.courseId
                }
            },
        });

        if (purchase) {
            return new NextResponse("Already purchased", {status: 400});
        };

        if (!course) {
            return new NextResponse("Not found", {status: 404});
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
             {
                quantity: 1,
                price_data: {
                 currency: 'UGX',
                 product_data: {
                    name: course.name
                 },
                 unit_amount: Math.round(course.price! * 100),
                }
             }
        ]




    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}