import prismadb from "@/lib/db"

export const getResetPasswordTokeByEmail = async(email: string) => {
   try {
    const resetPasswordToken = await prismadb.resetPasswordToken.findFirst({
        where: {
            email
        }
    })
    return resetPasswordToken;
    
   } catch  {
    return null
   }
}

export const getResetPasswordTokenByToken = async(token: string) => {
    try {
     const resetPasswordToken = await prismadb.resetPasswordToken.findUnique({
         where: {
             token
         }
     })
     return resetPasswordToken
     
    } catch  {
     return null
    }
 }