"use server";

import { hash } from "bcryptjs";

import { SignUpSchema } from "@/schemas";
import * as z  from "zod";
import prismadb from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values:z.infer<typeof SignUpSchema>) => {
    const validateFields = SignUpSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid entries!"};
    }

    const {email, name, password} = validateFields.data;
    const hashedPassword = await hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return {error: 'Email already in use'};
    }

    await prismadb.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {success: 'You have been sent an email to verify your acount.'};
};