"use client";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QuizShema } from '@/schemas';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next-nprogress-bar';
import { LinearProgress } from '@mui/material';


const QuizCreateCard = () => {
  const [pending, setPending] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof QuizShema>>({
    resolver: zodResolver(QuizShema),
    defaultValues: {
      length: '',
      topic: '',
      name: '',
    }
  })

  const onSubmit = (values: z.infer<typeof QuizShema>) => {
    setPending(async () => {

      try {
        const response = await axios.post("/api/questions", values);   
        toast.success("Quiz created successfully"); 
        form.reset();
        router.push(`/tutor/quizzes/${response.data.id}`, {}, {showProgressBar: true});
        console.log(response.data)
    } catch (error) {
            form.reset();
            toast.error("Something went wrong");
        
    }
   })
  }
  return (
  
       <Dialog>
         
        <DialogTrigger asChild >
              <button className='button1 gap-1 '><Plus size={22}/> <span>new quiz</span></button>
        </DialogTrigger>
        
        <DialogContent className='max-sm:max-w-[330px]'>
          {/*
           !pending &&
                <LinearProgress className='absolute top-0 left-0 ' sx={{
                 
                  height: '4px',}}/>
                */ }
               <div className='p-6'>
               <DialogHeader>
                  <DialogTitle className='text-2xl font-bold'>
                    Create Quiz
                  </DialogTitle>

                  <DialogDescription>
                    Choose a topic relevant to your courses and a quiz will be created
                  </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>

                        
                        <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Quiz Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='e.g. Evaluation 1' className='focus-visible:outline-primary' disabled={pending}/>
                                </FormControl>
                            
                               
                                <FormMessage/>
                            </FormItem>
                            )}
                          />
                    <FormField
                        control={form.control}
                        name='topic'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Topic</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='e.g. Linux' className='focus-visible:outline-primary' disabled={pending}/>
                                </FormControl>
                            
                               
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                      
                         <FormField
                        control={form.control}
                name="difficulty"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={pending}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Level of difficulty" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription>
                   How difficult will the quiz be?
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                            )}/>

                    <FormField
                        control={form.control}
                        name='length'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Number of questions</FormLabel>
                                <FormControl className='w-1/4'>
                                    <Input {...field} placeholder='10' className='focus-visible:outline-primary' disabled={pending} type='number'/>
                                </FormControl>
                            
                                <FormDescription>
                                    How many questions will the quiz have?
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />

                 <DialogFooter className='flex flex-row items-start gap-x-2'>
                
                       <DialogClose asChild>
                            <button type='button' className='button2' disabled={pending}>
                                Cancel
                            </button>

                       </DialogClose>

                        <button type='submit' className='button1' disabled={pending}>
                                Continue
                            </button>
                  
                 </DialogFooter>
                       

                    </form>
                  </Form>
               </div>
               
        </DialogContent>

       </Dialog>
    
  )
}

export default QuizCreateCard