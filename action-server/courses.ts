"use server";

import prismadb from "@/lib/db";

export const fetchCourseByCategoryName = async (category: string) => {
    
    try {
        const courses = await prismadb.course.findMany({
            where: {
                NOT: {
                    courseStatus: 'Coming_Soon'
                },
                ...(category !== 'All' && {
                    category: {
                        name: category
                    }
                })
            },
            include: {
                category: true
            }
        });
        return courses
        
    } catch  {
        return null;
        
    }
}