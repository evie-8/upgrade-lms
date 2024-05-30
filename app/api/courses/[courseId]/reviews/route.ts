import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, 
    {params}: {params: {courseId: string}}
) {
    try {
        
        const user = await currentUser();
        const {rating, ratingDescription, review} = await req.json();

        
        if (!user) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        const existingReview = await prismadb.review.findUnique({
            where: {
                reviewerId_courseId: {
                    reviewerId: String(user.id),
                    courseId: params.courseId
                }
            }
        });

        if (existingReview) {
            return new NextResponse("You already made a review on this course", {status: 400})
        }

        const newReview = await prismadb.review.create({
            data: {
                courseId: params.courseId,
                reviewerId: String(user.id),
                review: review,
                rating: rating,
                ratingDescription: ratingDescription
            }
        });
        
        return NextResponse.json(newReview)

    } catch (error) {
        console.log('[REVIEW_POST]', error);
        return new NextResponse("Internal Error", {status: 500})
        
    }
}