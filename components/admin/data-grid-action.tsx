"use client";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import ConfirmAction from '@/components/ui/confirm-action'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const ActionCell = ({id}: {id: string}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    const onDelete = async () => {
      try {
        setIsLoading(true);
        await axios.delete(`/api/courses/${id}`);
        toast.success("Course deleted");
        router.refresh();
      } catch {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='inline-flex items-center justify-center h-8 w-8 p-0'>
            <MoreHorizontal className='h-4 w-4' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='border-grey bg-white' align='end'>
          <Link href={`/tutor/courses/${id}`}>
            <DropdownMenuItem className='hover:text-destructive'>
              <Pencil className='h-4 w-4 mr-2' />
              Edit
            </DropdownMenuItem>
          </Link>
          <ConfirmAction onConfirm={onDelete}>
           
                <button className='flex items-start justify-center rounded-sm px-2 py-1.5 hover:text-destructive cursor-pointer text-sm outline-none transition-color data-[disabled]:pointer-events-none data-[disabled]:opacity-50' disabled={isLoading}>
                <Trash2 className='h-4 w-4 mr-2' />
                Delete
                </button>
            
          </ConfirmAction>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  };

  export default ActionCell