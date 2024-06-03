"use server";

import prismadb from "@/lib/db";

export const getPurchaseByUserId = async(courseId: string, userId: string)=> {
    try {
        const order = await prismadb.order.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        })
        
        return order
    } catch  {
        return null
    }
}