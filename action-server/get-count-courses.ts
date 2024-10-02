"use server";

import prismadb from "@/lib/db";
import getProgress from "./get-progress";

export const getNumberOfUsersEnrolledInFreeCourse = async(courseId: string) => {
    try {
      const users = await prismadb.user.findMany({
        where: {
          role: 'USER'
        },
        select: {
        id: true
        },

      });

      for (const user of users) {
        const {percentageCompleted} = await getProgress(user.id, courseId);

        user.progress = percentageCompleted
       
      }

      let count = 0;
      for (const user of users) {
        if (user.progress > 0) {
          count = count + 1
        } 
      };
      

      return count
       
    } catch  {
        return 0;
    }
}