"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Course } from "@prisma/client";
import Editor from "@/components/editor";
import EditorPreview from "@/components/editor-preview";


interface Props {
    data: Course;
}

const DescriptionForm: React.FC<Props> = ({data}) => {
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useTransition();
  
  const router = useRouter();
  
  const toggle = () => {
    setEditing(prev => !prev)
  }

  const formschema = z.object({
    description: z.string().min(1, 'description required'),
});


const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      description: data.description || ""
    }
})

const onSubmit = (values: z.infer<typeof formschema>) => {
    setPending(async() => {
       try {
        
            await axios.patch(`/api/courses/${data.id}`, values);
            toast.success("Course description updated");
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
            Course description
            <button onClick={toggle} className="inline-flex whitespace-nowrap items-center justify-center gap-1 text-sm">
               {
                editing ? <> Cancel</> : <>
                     <Pencil className="h-4 w-4 mr-2"/>
                Edit description
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
                        name='description'
                        render={({field}) => (
                            <FormItem>
                               
                                 <FormControl>
                                 <Editor {...field} />

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
            (
              !data.description ? 
              <p className={`text-sm mt-2 font-normal text-gray/60 italic`}>No description</p>
              :
              <EditorPreview value={data.description}/>

            )
            
        }
    </div>
  )
}

export default DescriptionForm