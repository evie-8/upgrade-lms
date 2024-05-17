import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_AUTH_URL
export const sendVerificationEmail = async (email: string,
    token: string) =>{
        const confirmationLink = `${domain}/auth/new-verification?token=${token}`;
        await resend.emails.send({
            from: "info@eazywrite.me",
            to: email,
            subject: "Confirm your email",
            html: `<p>Click <a href="${confirmationLink}">here </a>to confirm email</p>`
        });
    
}

export const sendPasswordResentEmail = async (email: string, name: string | null,
    token: string) =>{
        const confirmationLink = `${domain}/auth/new-password?token=${token}`;
        await resend.emails.send({
            from: "info@eazywrite.me",
            to: email,
            subject: "Reset Your Password",
            html:`<h2>Dear ${name}</h2> <br/> <p> Click <a href="${confirmationLink}">here </a>to reset your password</p>`
        });
    
}

export const sendTwoFactorEmail = async (email: string, token: string) =>{
    await resend.emails.send({
        from:"info@eazywrite.me",
        to: email,
        subject: "2FA Code",
        html:`<p> This is your OTP Code <br/> ${token}</p>`

    });

}