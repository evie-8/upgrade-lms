import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicPrefix, publicRoutes } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth ((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;
  
  const isApiRoute = apiAuthPrefix.some(prefix => nextUrl.pathname.startsWith( `${prefix}`));
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicDynmaicRoute = publicPrefix.some(prefix => nextUrl.pathname.startsWith( `${prefix}`));

  if (isApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return;
  }
  
  if (!isLoggedIn && !isPublicRoute && !isPublicDynmaicRoute) {
    let callbackUrl = nextUrl.pathname;
    let newParams =''
    if (nextUrl.search) {
    newParams =  nextUrl.search + "&" + "callbackUrl="+ callbackUrl
    }
    else {
    newParams = "?callbackUrl=" + callbackUrl
    }
    
    //const encodedCallbackUrl = encodeURIComponent(newParams)
    return Response.redirect(new URL(`/auth/sign-in${newParams}`, nextUrl));
  }

 return;
  
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  }