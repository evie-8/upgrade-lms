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
import { Combobox } from "@/components/ui/combobox";
import { Course } from "@prisma/client";


interface Props {
    data: Course;
    options: { label: string, value: string}[]
}

const CategoryForm: React.FC<Props> = ({data, options}) => {
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useTransition();
  const router = useRouter();
  
  const toggle = () => {
    setEditing(prev => !prev)
  }

  const formschema = z.object({
    categoryId: z.string().min(1, 'category required'),
});


const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      categoryId: data.categoryId || ""
    }
})

const onSubmit = (values: z.infer<typeof formschema>) => {
    setPending(async() => {
       try {
        
            await axios.patch(`/api/courses/${data.id}`, values);
            toast.success("Course category updated");
            toggle();
            router.refresh();
            
        } catch  {
            toast.error("Something went wrong")
        } 
        
    })
};

 const selectedOption = options.find((option) => option.value === data.categoryId);
  return (
    <div className="mt-6  bg-primary/10 rounded-md p-4">
       <div className="font-semibold  flex items-center justify-between">
            Course category
            <button onClick={toggle} className="inline-flex whitespace-nowrap items-center justify-center gap-1 text-sm">
               {
                editing ? <> Cancel</> : <>
                     <Pencil className="h-4 w-4 mr-2"/>
                Edit category
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
                            name='categoryId'
                            render={({field}) => (
                                <FormItem >
                                <FormControl >
                                  <Combobox  options={options} {...field} />
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
                <p className={`text-sm mt-2 font-normal line-clamp-2 ${!data.categoryId && "text-gray/60 italic"}`}>
                  {selectedOption?.label || "No Category"}
                </p>
        }
    </div>
  )
}
   
export default CategoryForm