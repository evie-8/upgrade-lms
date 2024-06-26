import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request, 
    {params}: {params: {courseId: string}}
) {
    
    try {
        
        const user = await currentUser();
        const {url} = await req.json();

        
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
        ];

        let stripeCustomer = await prismadb.stripeCustomer.findUnique({
            where: {
                userId: user.id
            }, 
            select: {
                stripeCustomerId: true
            }
        });

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name! , 
            });

            stripeCustomer = await prismadb.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id
                }
            });
        };
        


        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_AUTH_URL}/${url}?success=1`,
            cancel_url: `${process.env.NEXT_AUTH_URL}/${url}?cancelled=1`,
            metadata: {
                courseId: course.id,
                userId: user.id, 
            }
        });
        return NextResponse.json({url: session.url});

    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}