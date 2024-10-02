/**
 * routes that don't need authentication 
 */

export const publicRoutes = [
    "/",
    "/about-us",
    "/auth/new-verification",
    "/auth/new-password",
    
];

/**
 * public routes
 */

 export const publicPrefix = ['/courses']
/**
 * Used for authentication and redirect to edit page
 */
export const authRoutes = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/error",
    "/auth/reset"
];


/**
 * api for authentication 
 */
export const apiAuthPrefix = ["/api/auth", "/api/uploadthing", "/api/webhook"]

export const DEFAULT_LOGIN_REDIRECT = '/student/dashboard';
export const DEFAULT_LOGIN_REDIRECT_2 = '/tutor/dashboard';


