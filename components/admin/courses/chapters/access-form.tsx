"use client"

import EditorPreview from "@/components/editor-preview";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course, Chapter } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface Props {
    chapter: Chapter & {courses: Course}
}

const ChapterAccessForm: React.FC<Props> = ({chapter}) => {
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useTransition();
  const router = useRouter();

  const toggle = () => {
    setEditing(prev => !prev)
  }

  const formschema = z.object({
    isFree: z.boolean().default(false),
});


const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
       isFree: !!chapter.isFree 
    }
})

const onSubmit = (values: z.infer<typeof formschema>) => {
    setPending(async() => {
        try {
            await axios.patch(`/api/courses/${chapter.courseId}/chapters/${chapter.id}`, values);
            toast.success("Chapter access updated");
            toggle();
            router.refresh();
            
        } catch  {
            toast.error("Something went wrong")
        }
    })
}

  return (
    <div className="mt-6  bg-primary/10 rounded-md p-4">
        { chapter.courses.paymentStatus !== 'Free' && 
       <div className="font-semibold  flex items-center justify-between">
            Chapter access
            <button onClick={toggle} className="inline-flex whitespace-nowrap items-center justify-center gap-1 text-sm">
               {
                editing ? <> Cancel</> : <>
                     <Pencil className="h-4 w-4 mr-2"/>
                Edit access
                </>
               }
            </button>
       </div>
    }
        {
            editing  ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <FormField
                        control={form.control}
                        name='isFree'
                        render={({field}) => (
                            <FormItem className="flex flex-row items-start justify-center space-x-3 space-y-0 rounded-md border border-grey bg-white p-4">
                               
                                 <FormControl>
                                   <Checkbox  checked={field.value}
                                   onCheckedChange={field.onChange}
                                   disabled={pending}
                                    {...field}/>
                                </FormControl>
                                <div className="leading-none space-y-1">
                                    <FormDescription className="text-gray">
                                        Check this box if you want to make this chapter free for preview?
                                    </FormDescription>
                                </div>
                            <FormMessage/>
                               
                            </FormItem>
                            )}
                        />
                          <div>
                            <button className="button1 bg-black2" disabled={pending} type="submit">
                                Save
                            </button>
                          </div>
                        </form>
                </Form>
            ) : 
            (
                chapter.isFree ? 
                <p className={`text-sm mt-2 font-normal`}>This chapter is free for preview</p>
                :
                <p className={`text-sm mt-2 font-normal`}>This chapter is not free for preview</p>
              
  
              )  
               }
    </div>
  )
}

export default ChapterAccessForm 