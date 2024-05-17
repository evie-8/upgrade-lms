"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatter } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface Props {
    data: {
        price: number | null;
        id: string;
        paymentStatus: string;
    };
}

const PriceForm: React.FC<Props> = ({data}) => {
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useTransition();
  const router = useRouter();

  const toggle = () => {
    setEditing(prev => !prev)
  }

  const formschema = z.object({
    price: z.string()
});


const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
        price: String(data.price) || '0'
    }
})

const onSubmit = (values: z.infer<typeof formschema>) => {
    setPending(async() => {
        try {
            const parsedValues = { ...values, price: Number(values.price) };

            await axios.patch(`/api/courses/${data.id}`, parsedValues);
            toast.success("Course price updated");
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
            Course price
           { data.paymentStatus !== 'Free' && 
             <button onClick={toggle} className="inline-flex whitespace-nowrap items-center justify-center gap-1 text-sm">
             {
              editing ? <> Cancel</> : <>
                   <Pencil className="h-4 w-4 mr-2"/>
              Edit price
              </>
             }
          </button>
           }
       </div>
        {
            editing ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <FormField
                        control={form.control}
                        name='price'
                        render={({field}) => (
                            <FormItem>
                               
                                 <FormControl>
                                    <Input {...field} placeholder='set price of this course' type='number' className='focus-visible:outline-primary bg-white border-transparent' disabled={pending}/>
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
            <p className={`text-sm mt-2 font-normal ${data.price === null && 'italic text-gray/60'}`}>{data.price === null ? 'No price' : formatter(data.price)}</p>
        }
    </div>
  )
}

export default PriceForm