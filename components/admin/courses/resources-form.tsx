"use client"

import { FileUploader, FileUploaderResources } from "@/components/ui/file-uploader";
import { Course, Resource } from "@prisma/client";
import axios from "axios";
import { File, ImageIcon, Loader2, Pencil, Plus, PlusCircle, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import toast from "react-hot-toast";
import * as z from "zod";


interface Props {
    data: Course &{resources: Resource[] };
}

const ResourcesForm: React.FC<Props> = ({data}) => {
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  

  const router = useRouter();
  
  const toggle = () => {
    setEditing(prev => !prev)
  }

  const formschema = z.object({
    url: z.string().min(1, 'course attachment required'),
});



const onSubmit = (values: z.infer<typeof formschema>) => {
    setPending(async() => {
       try {
        console.log(values)
        
            await axios.post(`/api/courses/${data.id}/resources`, values);
            toast.success("Course resources updated");
            toggle();
            router.refresh();
            
        } catch  {
            toast.error("Something went wrong")
        } 
        
    })
};

const onDelete = async(id: string) => {
  try {
    setDeletingId(id);
    await axios.delete(`/api/courses/${data.id}/resources/${id}`);
    toast.success("Resource deleted");
    router.refresh();
    
  } catch {
    toast.error("Something went wrong");
    
  } finally {
    setDeletingId(null);
  }
}

  return (
    <div className="mt-6  bg-primary/10 rounded-md p-4">
       <div className="font-semibold  flex items-center justify-between">
            Course resources
            <button onClick={toggle} className="inline-flex whitespace-nowrap items-center justify-center gap-1 text-sm">
               {
                editing ? <> Cancel</>  :
                      <>
                        <Pencil className="h-4 w-4 mr-2"/>
                         Add a file
                      </>
                     
              
               }
            </button>
       </div>
        {
            editing    ? (
               <div>
                <FileUploader endpoint="courseResources" onChange={(url) => {
                  console.log('url', url)
                  if (url) {
                    onSubmit({url: url})
                  }
                } } />

                  <div className="text-xs text-gray/60 mt-4 italic">Add any resources that will be helpful to students doing this course</div>
               </div>
             
                
            ) : 
               <>
               {
                data.resources.length === 0 && (
                  <p className="text-sm text-gray/60 mt-2 italic">No attachments yet</p>
                )
               }
               {
                data.resources.length > 0 && (
                  <div className="mt-3 space-y-2">
                      {
                        data.resources.map((resource) => (
                          <div key={resource.id}
                          className="flex items-center p-3 w-full rounded-md bg-white"
                          >
                            <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                            <p className="text-xs line-clamp-1">
                              {resource.name}
                            </p>
                            {
                              deletingId === resource.id && (
                                <div className="ml-auto">
                                  <Loader2 className="h-4 w-4 animate-spin"/>
                                </div>
                              )
                            }

                            { deletingId !== resource.id && (
                                <button onClick={() => onDelete(resource.id)}
                                className="p-1 bg-danger/10 text-danger rounded-full ml-auto hover:opacity-75 transition">
                                  <X className="h-4 w-4 "/>
                                </button>
                              )
                            }


                          </div>
                        ))
                      }
                  </div>
                )
               }
               </>
        }
    </div>
  )
}

export default ResourcesForm;