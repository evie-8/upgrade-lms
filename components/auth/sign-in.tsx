"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignInSchema } from "@/schemas"
import * as z from "zod";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormError, FormSuccess } from "@/components/auth/form-message";
import { useState, useTransition } from "react";
import { logIn } from "@/action-server/login";
import AuthCard from "@/components/auth/auth-card";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const SignInForm = () => {
  const searchParams = useSearchParams();
  const urlError =  searchParams.get('error') === "OAuthAccountNotLinked" ? "Email is aleady in use with a different account!" : "";
  
  const callbackUrl =searchParams.get("callbackUrl");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [pending, setPending] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
          defaultValues: {
            email: "",
            password: "",      
        },
      });

      const onSubmit = (values: z.infer<typeof SignInSchema>) => {
        setError("");
        setSuccess("");
           setPending(() => {
            logIn(values, callbackUrl).then((data: any) => {
              if (data?.success) {
                form.reset();
                setSuccess(data.success);
              }

              if (data?.error) {
                form.reset();
                setError(data.error);
              }

             if (data?.twoFactor && data?.message) {
                setShowTwoFactor(true);
                setSuccess(data.message);
              }
            }).catch(() => {
              setError("Something went wrong!")
            })

           })
      }
  return (

<AuthCard headerLabel="Sign In" 
        messageLabel="Welcome back, you have been missed"
        socials={showTwoFactor ? false : true}
        backref="/auth/sign-up"
        backrefDescription="Don't have an account?"
        backrefMessage="Sign Up">
          
       

        <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormSuccess message={success}/>
                    <FormError message={error || urlError}/>

                    {
                      showTwoFactor && <>
                              <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                  <FormItem className="w-full h-auto mb-5 flex items-center justify-center flex-col">
                                    <FormLabel className="mb-1 mt-3">One-Time Password</FormLabel>
                                    <FormControl>
                                      <InputOTP maxLength={6} {...field} disabled={pending}>
                                        <InputOTPGroup>
                                          <InputOTPSlot index={0} />
                                          <InputOTPSlot index={1} />
                                          <InputOTPSlot index={2} />
                                          <InputOTPSlot index={3} />
                                          <InputOTPSlot index={4} />
                                          <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                      </InputOTP>
                                    </FormControl>
                                   
                                    <FormMessage />
                                  </FormItem>
          )}
        />

                      
                      </>
                    }
                    {
                      !showTwoFactor &&
                   <>
                   <FormField 
                       
                       control={form.control}
                       name="email"
                       render={({field}) => (
                        <FormItem className="w-full h-auto mb-5">
                            <FormLabel className="mb-1">Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" type="email" {...field}  disabled={pending}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                       )}
                       />

                    <FormField 
                       
                       control={form.control}
                       name="password"
                       render={({field}) => (
                        <FormItem className="w-full h-auto mb-5">
                            <FormLabel className="mb-1">Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a password" type="password"  {...field}  disabled={pending}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                       )}
                       />

                   
                       <div className="w-full mb-7">
                       <Link href="/auth/reset" className="text-sm font-medium hover:underline hover:text-primary ease-out duration-[0.3s]">Forgot password?</Link>

                       </div>
                       </>
                       }
                     
                     <button className="w-full h-12 outline-none rounded-md text-base  font-semibold mb-7 border-2 border-transparent bg-primary text-white hover:bg-opacity-90 transition-all ease-out duration-[0.3s]" disabled={pending}>{pending ? <BeatLoader/> : showTwoFactor ? 'Confirm': 'Sign In'}</button>
                    </form>

                </Form>
        </AuthCard>
       
  )
}

export default SignInForm