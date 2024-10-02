"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ChangePasswordSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import Animation from "../../ui/animation";

import {FormError, FormSuccess} from "@/components/auth/form-message";

import { BeatLoader } from "react-spinners";
import { changePassword } from "@/action-server/new-password";
import { Button } from "../../ui/button";


const ChangePassword = () => {

    const [loading, setLoading] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string | undefined>("");
    const [successMessage, setSucessMessage] = useState<string | undefined>("");
    
    const  form = useForm<z.infer<typeof  ChangePasswordSchema>>({
        resolver: zodResolver( ChangePasswordSchema),
        defaultValues: {
       
          password: "",
          confirmPassword: "",
          currentPassword: ""
        },
      });
    

      const onSubmit =  (values: z.infer<typeof  ChangePasswordSchema> )=> {
        
        setErrorMessage("");
        setSucessMessage("");
                
        setLoading( () => {
            changePassword(values).then((data) => {
                if (data.error) {
                 form.reset();
                 setErrorMessage(data.error);
                }
                 if (data.success) {
                     form.reset();
                     setSucessMessage(data.success);
                 
                 }
               })
             });                                   
        }

    return (
     <Animation>
        
          <Form {...form}>

            <div  className=" w-full my-5">
            <h2 className='text-xl font-bold'>Change password</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-3">
               
                <FormError message={errorMessage}/>
                <FormSuccess message={successMessage}/>

                <FormField
                control={form.control}
                name="currentPassword"
                render={( { field }) => (
                    <FormItem>
                    
                        <FormControl>
                            <Input className="" placeholder="Current Password"  type="password" {...field} disabled={loading}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                /> 

                <FormField
                control={form.control}
                name="password"
                render={( { field }) => (
                    <FormItem>
                    
                        <FormControl>
                            <Input className="" placeholder="New Password" type="password" {...field} disabled={loading}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                /> 
                
                <FormField
                control={form.control}
                name="confirmPassword"
                render={( { field }) => (
                    <FormItem>
                    
                        <FormControl>
                            <Input placeholder="Re enter password"  type="password" {...field} disabled={loading}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            
               <div className="flex items-end justify-end">
               <Button  type='submit' disabled={loading}>
                {!loading ? (<span>Change Password</span>) : (<BeatLoader />)}
                </Button>

               </div>

            </form>
            </div>
           
        </Form>

      
      
    </Animation>
    
)}

export default ChangePassword;
