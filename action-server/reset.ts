"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResentEmail } from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/tokens";
import { ResetSchema } from "../schemas";
import * as z from "zod";


export const reset = async (values: z.infer<typeof ResetSchema>) => {

    const validateFields = ResetSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid email"}
    }

    const {email} = validateFields.data

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {error: "User with this email does not exist"};
    }

    const passwordResetToken = await generateResetPasswordToken(email);
    await sendPasswordResentEmail(passwordResetToken.email, existingUser.name, passwordResetToken.token)


    return {success: "You have been sent an email to reset your password!"}
}