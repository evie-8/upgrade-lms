"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, Lesson } from "@prisma/client";
import axios from "axios";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRouter as useRouter2} from "next-nprogress-bar";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import ChapterLessonsList from "./lesson-card-list";


interface Props {
    chapter: Chapter &{Lesson: Lesson[]};
}

const ChapterLessonForm: React.FC<Props> = ({chapter}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [pending, setPending] = useTransition();
  const router = useRouter();
  const router2 = useRouter2();

  const toggle = () => {
    setIsCreating(prev => !prev)
  }

  const formschema = z.object({
    name: z.string().min(1, 'Title is required'),
});


const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
        name: ""
    }
})

const onSubmit = (values: z.infer<typeof formschema>) => {
    setPending(async() => {
        try {
            await axios.post(`/api/courses/${chapter.courseId}/chapters/${chapter.id}/lessons`, values);
            toast.success("Chapter lesson updated");
            toggle();
            router.refresh();
            
        } catch  {
            toast.error("Something went wrong")
        }
    })
}

const onReorder = async(updatedData: {id: string, position: number}[]) => {

try {
    setIsUpdating(true);
    await axios.put(`/api/courses/${chapter.courseId}/chapters/${chapter.id}/lessons/reorder`, {
        list: updatedData
    });
    toast.success("Chapter lessons reordered successsfuly");
    router.refresh();
    
} catch  {
    toast.error("Something went wrong")
    setIsUpdating(false);
    
} finally {
    setIsUpdating(false);
}
};


const onEdit = (id: string) => {

    router2.push(`/tutor/courses/${chapter.courseId}/chapters/${chapter.id}/lessons/${id}`, {}, {showProgressBar: true})
};
  return (
    <div className="mt-6  bg-primary/10 rounded-md p-4 relative ">
        {
            isUpdating && (
                <div className="absolute h-full w-full top-0 right-0 rounded-md bg-black2/10 flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-primary"/>
                </div>
            )
        }
       <div className="font-semibold  flex items-center justify-between">
            Course lessons
            <button onClick={toggle} className="inline-flex whitespace-nowrap items-center justify-center gap-1 text-sm">
               {
                isCreating ? <> Cancel</> : <>
                     <PlusCircle className="h-4 w-4 mr-2"/>
                Add a lesson
                </>
               }
            </button>
       </div>
        {
            isCreating ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name='name'
                            render={({field}) => (
                                <FormItem>
                                
                                    <FormControl>
                                        <Input {...field} placeholder='e.g. Syntax rules' className='focus-visible:outline-primary bg-white border-transparent' disabled={pending}/>
                                    </FormControl>
                                <FormMessage/>
                                
                                </FormItem>
                                )}
                            />
                          <div>
                            <button className="button1 bg-black2" disabled={pending} type="submit">
                                Create
                            </button>
                          </div>
                    </form>
                </Form>
            ) : 
              
            !chapter.Lesson.length ?
                <p className={`text-sm mt-2 text-gray/60 font-normal italic `}>No lessons</p>
                :
            <div className="mt-3">
            <ChapterLessonsList items={chapter.Lesson || []} onEdit={onEdit} onReorder={onReorder}/>
            <p className="text-xs text-gray.60 mt-4">
                Drag and drop to reorder the lessons
             </p>
            </div>
          
        }            
    </div>
  )
}

export default ChapterLessonForm