"use server";

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import prismadb from "@/lib/db";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { SignInSchema } from "@/schemas";
import { compare } from "bcryptjs";
import { AuthError } from "next-auth";
import * as z  from "zod";

export const logIn = async (values: z.infer<typeof SignInSchema>, callbackUrl?: string | null) => {
    const validateFields = SignInSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid entries!"}
    }

    const{email, password, code} = validateFields.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Account doesn't exist!"}
    };

    if (!existingUser?.emailVerified) {

        const passwordMatch = await compare(password, existingUser.password);
    
        if (passwordMatch) {
            const verificationToken = await generateVerificationToken(existingUser.email);
    
            await sendVerificationEmail(verificationToken.email, verificationToken.token);
            return {success: "You have been sent an email to verify your acount."}
        }
        
        return {error: "Invalid password or email"}
       
       }

       if (existingUser.isTwoFactorEnabled && existingUser.email) {

        if (code) {
     
         const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
     
         if (!twoFactorToken) {
             return {error: "Invalid OTP!"}
         }
     
         if (twoFactorToken.token !== code) {
             return {error: "Invalid 0TP!"}
         }
     
         const expired = new Date(twoFactorToken.expires) < new Date();
         if (expired) {
             return {error: "OTP has expired"};
         }
     
         await prismadb.twoFactorToken.delete({
             where: {
                 id: twoFactorToken.id
             }
         })
     
         const existingConfirm = await getTwoFactorConfirmationByUserId(existingUser.id);
     
         if (existingConfirm) {
             await prismadb.twoFactorConfirmation.delete({
                 where: {
                     id: existingConfirm.id,
                 }
             })
         }
     
         await prismadb.twoFactorConfirmation.create({
             data: {
                 userId: existingUser.id
             }
         })
     
        } 
        
        else {
        
         const twoFactorToken  = await generateTwoFactorToken(existingUser.email, password);
     
         if (!twoFactorToken) {
             return {error: "invalid email or password entered"}
         } else {
             await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
     
             return {twoFactor: true, message: 'OTP has been sent your email and expires in 5 minutes!'};
         }
        }
     }
     
    
    try {

        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
        
    } catch (error) {
        if (error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin" :
                        return {error: "Invalid email or password"}
            default: 
                return {error: "Something went Wrong!"}
            }
        } 
        throw error
        
    }
}