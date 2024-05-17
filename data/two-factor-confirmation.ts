import prismadb from "@/lib/db"

export const getTwoFactorConfirmationByUserId = async (userId: any) => {
    try {

        const twoFactorConfirmation = await prismadb.twoFactorConfirmation.findUnique({
            where: {
                userId
            }
        })

        return twoFactorConfirmation;
    } catch  {
        return null;
        
    }
}