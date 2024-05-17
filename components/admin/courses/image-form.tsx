"use client"

import { FileUploader } from "@/components/ui/file-uploader";
import { Course } from "@prisma/client";
import axios from "axios";
import { ImageIcon, Pencil, Plus, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import toast from "react-hot-toast";
import * as z from "zod";


interface Props {
    data: Course;
}

const ImageForm: React.FC<Props> = ({data}) => {
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useTransition();
  

  const router = useRouter();
  
  const toggle = () => {
    setEditing(prev => !prev)
  }

  const formschema = z.object({
    imageUrl: z.string().min(1, 'course image reqired'),
});



const onSubmit = (values: z.infer<typeof formschema>) => {
    setPending(async() => {
       try {
       
            await axios.patch(`/api/courses/${data.id}`, values);
            toast.success("Course image updated");
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
            Course image
            <button onClick={toggle} className="inline-flex whitespace-nowrap items-center justify-center gap-1 text-sm">
               {
                editing ? <> Cancel</> : <>
                     {
                      !data.imageUrl ? 
                      <>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Add an image
                      </> : 
                      <>
                        <Pencil className="h-4 w-4 mr-2"/>
                         Edit image
                      </>
                     }
                </>
               }
            </button>
       </div>
        {
            editing ? (
               <div>
                <FileUploader endpoint="courseImage" onChange={(url) => {
                 
                  if (url) {
                    onSubmit({imageUrl: url})
                  }
                } } />

                  <div className="text-xs text-gray/60 mt-4 italic">16:9 aspect ratio recommended</div>
               </div>
             
                
            ) : 
                (
                  data.imageUrl ? 
                  <div className="relative aspect-video mt-2 ">
                    <Image alt="upload" className="object-cover rounded-md " fill src={data.imageUrl}/>
                  </div>
                  : (
                    <div className="flex items-center justify-center h-60 bg-white1 rounded-md mt-4">
                      <ImageIcon className="h-10 w-10"/>
                    </div>
                  )
                )
        }
    </div>
  )
}

export default ImageForm;