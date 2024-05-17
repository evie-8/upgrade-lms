import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth"
import { SignInSchema } from "./schemas";
import { getUserByEmail } from "@/data/user";
import { compare } from "bcryptjs";

export default {
  providers: [
    Github({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,  
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,  
    }),

    Credentials({
    async authorize(credentials) {
        const validateFields = SignInSchema.safeParse(credentials);
        if (validateFields.success) {
            const {email, password} = validateFields.data;

            const user = await getUserByEmail(email);
            if (!user || !user.password) return null;

            const passwordMatch = await compare(password, user.password);

            if (passwordMatch) return user;
        }
        return null;

    }
  }),
]
} satisfies NextAuthConfig