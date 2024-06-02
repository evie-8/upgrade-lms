import prismadb from "@/lib/db"

export const getAccountByUserId = async(userId: any) => {
    try {
        const account = await prismadb.account.findFirst({
            where:{
                 userId
            }
        })
        return account
    } catch (error) 
    {
        return null    
    }
}