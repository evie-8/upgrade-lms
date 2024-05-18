"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useTransition } from 'react';
import { CourseCreationSchema } from '@/schemas';
import { PaymentStatus, SkillLevel } from "@prisma/client";
import axios from 'axios';
import { useRouter } from "next-nprogress-bar";
import toast from "react-hot-toast";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import ConfirmAction from "@/components/ui/confirm-action";

const CreateCourseCard = () => {

    const [pending, setPending] = useTransition();
    const router = useRouter();
   
    
    const form = useForm<z.infer<typeof CourseCreationSchema>>({
        resolver: zodResolver(CourseCreationSchema),
          defaultValues: {
           name: '',
          duration:'',
          unit: '',
                
        },
      });

      const onSubmit = (values: z.infer<typeof CourseCreationSchema>) => {
       setPending(async () => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/tutor/courses/${response.data.id}`, {}, {showProgressBar: true}) ;
            toast.success("Course created successfully");
            form.reset(); 
        } catch (error) {
            form.reset();
            toast.error("Something went wrong");
            
        }
       })
      }

  return (
  
    <Container>
        <div className='max-w-7xl flex flex-col h-full'>
        <div>
        <h2 className='font-bold text-2xl'>
            Name your course
        </h2>
        <p className='text-sm'>What would you like to name your course? You will be able change it later</p>
    
        </div>
      <div>

           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full mt-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Course name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='e.g Front-End Development' className='focus-visible:outline-primary' disabled={pending}/>
                                </FormControl>
                            
                                <FormDescription>
                                    What will you teach?
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                       
                        <FormField
                        control={form.control}
                        name='duration'
                        render={({field}) => (
                            <FormItem className=''>
                                <FormLabel>Course Duration</FormLabel>
                               <div className='flex  gap-4  w-3/4'>
                               <FormControl>
                                    <Input {...field} placeholder='10' className='focus-visible:outline-primary w-16' type='number' min={1} disabled={pending}/>
                                </FormControl>
                                <Select  onValueChange={(value) => form.setValue('unit', value)} disabled={pending}>
                                    <SelectTrigger>
                                    <SelectValue placeholder='course length'/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='weeks'>weeks</SelectItem>
                                        <SelectItem value='months'>months</SelectItem>
                                    </SelectContent>
                                </Select>
                               </div>
                            
                                <FormDescription>
                                    How long will this course be?
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />

                  
                        <FormField
                        control={form.control}
                name="level"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Skill level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={pending}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Course difficulty level" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value={SkillLevel.Beginner}>Beginner</SelectItem>
                        <SelectItem value={SkillLevel.Intermediate}>Intermediate</SelectItem>
                        <SelectItem value={SkillLevel.Expert}>Expert</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription>
                    What skill level is required for this course?
                    
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                            )}
                        />
                          <FormField
                        control={form.control}
                name="payment"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Course availability</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={pending}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Enter payment status" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value={PaymentStatus.Free}>Free</SelectItem>
                        <SelectItem value={PaymentStatus.Paid}>Paid</SelectItem>
                       
                        </SelectContent>
                    </Select>
                    <FormDescription>
                    Will this be a paid or a free course? 
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                            )}
                        />
          

                </div>
                     
                <div className='flex items-center gap-x-2 mt-8'>
                        <Link href={"/tutor/courses"}>
                            <Button type='button' variant="outline" disabled={pending}>
                                Cancel
                            </Button>
                        </Link>

                    
                      <ConfirmAction  onConfirm={() =>form.handleSubmit(onSubmit)()} action="Continue" 
                       description="You will not be able to change skill level, payment status and course duration fields once you submit">
                       <Button type='button'  disabled={pending} >
                                    Continue
                        </Button>
                       </ConfirmAction>
                     
                    
                </div>
            </form>
       </Form>
      </div>
    </div>
    </Container>
  
  
  )
}

export default CreateCourseCard