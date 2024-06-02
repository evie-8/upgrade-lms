import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismadb from "./lib/db"
import { getUserById } from "./data/user"
import { Role } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({user}) {
            await prismadb.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        
        async signIn({user, account}) {
            if (account?.provider !== "credentials") return true;


            const existingUser = await getUserById(String(user.id));
            if (!existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
                if (!twoFactorConfirmation) {
                    return false;
                };

                await prismadb.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                })
            }

            return true;
        },

        async session({token, session}) {
            if (session.user) {
                if (token.sub)  session.user.id = token.sub;
             
                if (token.role) session.user.role = token.role as Role;
            
                if (token.picture) session.user.image = token.picture;

                if (token.isOAuth) session.user.isOAuth = token.isOAuth as boolean;
                
            };

            return session
        },

        async jwt({token}) {
            if (!token.sub) {
                return token;
            }

            const existingUser = await getUserById(token.sub);
            const existingAccount = await getAccountByUserId(token.sub)

            token.isOAuth = !!existingAccount
            if (!existingUser) {
                return token;
            }

            token.role = existingUser.role;
            token.picture = existingUser.image;

            return token
        }
    },
   
    adapter: PrismaAdapter(prismadb),
    session: {strategy: "jwt"},
  ...authConfig,
})    