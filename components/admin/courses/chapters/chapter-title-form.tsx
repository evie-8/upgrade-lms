"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface Props {
    chapter: {
        name: string;
        id: string;
        courseId: string;
    };
}

const TitleForm: React.FC<Props> = ({chapter}) => {
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useTransition();
  const router = useRouter();

  const toggle = () => {
    setEditing(prev => !prev)
  }

  const formschema = z.object({
    name: z.string().min(1, 'Title is required'),
});


const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: chapter
})

const onSubmit = (values: z.infer<typeof formschema>) => {
    setPending(async() => {
        try {
            await axios.patch(`/api/courses/${chapter.courseId}/chapters/${chapter.id}`, values);
            toast.success("Chapter name updated");
            toggle();
            router.refresh();
            
        } catch  {
            toast.error("Something went wrong")
        }
    })
}

  return (
    <div className="mt-6  bg-primary/10 rounded-md p-4">
       <div className="font-semibold  flex items-center justify-between">
            Chapter name
            <button onClick={toggle} className="inline-flex whitespace-nowrap items-center justify-center gap-1 text-sm">
               {
                editing ? <> Cancel</> : <>
                     <Pencil className="h-4 w-4 mr-2"/>
                Edit name
                </>
               }
            </button>
       </div>
        {
            editing ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                               
                                 <FormControl>
                                    <Input {...field} placeholder='e.g Introduction to HTML' className='focus-visible:outline-primary bg-white border-transparent' disabled={pending}/>
                                </FormControl>
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
            <p className="text-sm mt-2 font-normal">{chapter.name}</p>
        }
    </div>
  )
}

export default TitleForm