"use client";

import { BeatLoader } from "react-spinners"
import AuthCard from "./auth-card"
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/action-server/new-verification";

import { FormError, FormSuccess } from "./form-message";
import { useRouter } from "next-nprogress-bar";

const VerificationCard = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const router = useRouter();

    const onSubmit = useCallback(() => {
        if (!token) {
            setError('Missing token!');
            return
        }
        newVerification(token).then((data) => {
           
            setError(data.error);
            if (data.success) {
                setSuccess(data.success);
                router.push("/auth/sign-in", {}, {showProgressBar: true})

            }

        }).catch(() => {
            setError("Something went wrong!")
        }) 
    }, [token, error, success])

    useEffect(() => {
        onSubmit();
    }, [onSubmit])
  return (
   <AuthCard backref="/sign-in" backrefMessage="Back to sign in" headerLabel="Account Activation" messageLabel="Confirming your verification">
        
        <div className="mb-7">
        {!success && !error && <BeatLoader className="text-center"/>}
        {!success && <FormError message={error}/>}
        <FormSuccess message={success}/>
        </div>
   </AuthCard>
  )
}

export default VerificationCard