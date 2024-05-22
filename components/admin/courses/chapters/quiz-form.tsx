"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Combobox } from "@/components/ui/combobox";
import { Chapter, Quiz } from "@prisma/client";
import prismadb from "@/lib/db";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import QuizPreview from "../../quizzes/quiz-preview";


interface Props {
    chapter: Chapter & {quiz: Quiz};
    options: { label: string, value: string}[]
}

const QuizForm: React.FC<Props> = ({chapter, options}) => {
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useTransition();
  const router = useRouter();
  
  const toggle = () => {
    setEditing(prev => !prev)
  }

  const formschema = z.object({
    quizId: z.string().min(1, 'quiz required'),
});


const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      quizId: chapter.quizId || ""
    }
})

const onSubmit = (values: z.infer<typeof formschema>) => {
    setPending(async() => {
       try {

            await axios.patch(`/api/courses/${chapter.courseId}/chapters/${chapter.id}`, values);
            toast.success("Course chapter updated");
            toggle();
            router.refresh();
            
        } catch  {
            toast.error("Something went wrong")
        } 
        
    })
};

 const selectedOption = options.find((option) => option.value === chapter.quizId);
  return (
    <div className="mt-6  bg-primary/10 rounded-md p-4">
       <div className="font-semibold  flex items-center justify-between">
           <span className="flex items-center justify-between ">
           Chapter quiz
          {
            chapter.quizId &&
            <Dialog>
            <DialogTrigger>
            <Eye className="text-primary h-4 w-4 ml-4"/>
            </DialogTrigger>
            <DialogContent className="w-full max-w-7xl  overflow-y-auto  max-h-[600px] p-8">
              <QuizPreview  data={chapter.quiz}/>
            </DialogContent>
          </Dialog>
          }
           </span>
            <button onClick={toggle} className="inline-flex whitespace-nowrap items-center justify-center gap-1 text-sm">
               {
                editing ? <> Cancel</> : <>
                     <Pencil className="h-4 w-4 mr-2"/>
                Edit quiz
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
                            name='quizId'
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
                <p className={`text-sm mt-2 font-normal line-clamp-2 ${!chapter.quizId && "text-gray/60 italic"}`}>
                  {selectedOption?.label || "No quiz"}
                </p>
        }
    </div>
  )
}
   
export default QuizForm