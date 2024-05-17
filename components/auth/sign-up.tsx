"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignUpSchema } from "@/schemas"
import * as z from "zod";
import {BeatLoader} from "react-spinners";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { FormError, FormSuccess } from "@/components/auth/form-message";
import { register } from "@/action-server/register";
import { useState, useTransition } from "react";
import AuthCard from "./auth-card";


const SignUpForm = () => {
    const [pending, setPending] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
          defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
      });

      const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
        setError("");
        setSuccess("");
           setPending(() => {
            register(values).then((data: any) => {
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
    
    <AuthCard headerLabel="Sign Up" 
        messageLabel="Create your account now"
        socials={true}
        backref="/auth/sign-in"
        backrefDescription="Have an account?"
        backrefMessage="Sign In">
          
        
        <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormSuccess message={success}/>
                    <FormError message={error}/>

                       <FormField 
                       
                       control={form.control}
                       name="name"
                       render={({field}) => (
                        <FormItem className="w-full h-auto mb-5">
                            <FormLabel className="mb-1">Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your Name"  {...field} disabled={pending}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                       )}
                       />

                    <FormField 
                       
                       control={form.control}
                       name="email"
                       render={({field}) => (
                        <FormItem className="w-full h-auto mb-5">
                            <FormLabel className="mb-1">Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" type="email" {...field} disabled={pending}/>
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
                                <Input placeholder="Enter a password" type="password"  {...field} disabled={pending}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                       )}
                       />

                    <FormField 
                       
                       control={form.control}
                       name="confirmPassword"
                       render={({field}) => (
                        <FormItem className="w-full h-auto mb-5">
                            <FormLabel className="mb-1">Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Renter password" type="password"  {...field} disabled={pending}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                       )}
                       />

                     
                     <button className="w-full h-12 outline-none rounded-md text-base  font-semibold mb-7 border-2 border-transparent bg-primary text-white hover:bg-opacity-90 transition-all ease-out duration-[0.3s]" disabled={pending}>{pending ? <BeatLoader />: 'Sign Up'}</button>
                    </form>

                </Form>

    </AuthCard>
  

  )
}

export default SignUpForm