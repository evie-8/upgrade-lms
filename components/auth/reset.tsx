"use client";

import { useState, useTransition } from "react";
import {  useForm } from "react-hook-form";
import AuthCard from "./auth-card";
import { FormError, FormSuccess } from "@/components/auth/form-message";
import { Form, FormLabel, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";

import * as z from "zod";

import { BeatLoader } from "react-spinners";
import { reset } from "@/action-server/reset";

const Reset = () => {
  const [pending, setPending] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
      defaultValues: {
        email: "",   
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
       setPending(() => {
        reset(values).then((data: any) => {
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.error) { 
            form.reset();
            setError(data.error);
          }
        })

       })
  }
  return (
    <AuthCard headerLabel="Forgot your Password" 
        messageLabel="Submit email used to create account"
        socials={false}
        backref="/auth/sign-in"
       
        backrefMessage="Back to sign in">
          
      
        <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormSuccess message={success}/>
                    <FormError message={error }/>

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

                     
                     <button className="w-full h-12 outline-none rounded-md text-base  font-semibold mb-7 border-2 border-transparent bg-primary text-white hover:bg-opacity-90 transition-all ease-out duration-[0.3s]" disabled={pending}>{pending ? <BeatLoader/> : 'Send email'}</button>
                    </form>

                </Form>
        </AuthCard>
  )
}

export default Reset;