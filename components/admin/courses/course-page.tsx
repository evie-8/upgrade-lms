"use client"
import { themeContext } from '@/components/theme'
import Container from '@/components/ui/container'
import {  MoreHorizontal, Pencil, PlusCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useContext, useState} from 'react'

import {GridRowsProp, GridColDef, DataGrid} from "@mui/x-data-grid";
import { Chapter, Course, Lesson } from '@prisma/client'
import prismadb from '@/lib/db'
import { formatter } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import ConfirmAction from '@/components/ui/confirm-action'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Props {
  data: Course[]
}
const columns: GridColDef<Course & {chapter: Chapter[]}>[] = [
 
  {
    field: 'name',
    headerName: 'Name',
    flex: 1
  }, 
  
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      
      renderCell: (params) => formatter(params.row.price)
    },
    {
      field: 'difficulty',
      headerName: 'Diffficulty',
      flex: 1,
      renderCell: (params) => <Badge className={`pointer-events-none bg-primary/20 text-primary font-normal`}>
        {params.row.difficulty}
      </Badge>  
      
    },

    {
      field: 'courseStatus',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => <Badge className={`pointer-events-none font-normal ${params.row.courseStatus === 'Open' ? 'bg-success/10 text-success': 'bg-destructive/10 text-destructive'}`}>{params.row.courseStatus  === 'Open'? 'open':'closed' }</Badge>
  
      
    },

    {
      field: 'chapter',
      headerName: 'Chapters',
      flex: 1,
      renderCell: (params) => params.row.chapter.length
    },
  
    {
      field: 'isAvailable',
      headerName: 'Published',
      flex: 1,
      renderCell: (params) => <Badge className={`pointer-events-none font-normal ${params.row.isAvailable ? 'bg-success/10 text-success': 'bg-destructive/10 text-destructive'}`}>{params.row.isAvailable ? 'published': 'draft'}</Badge>      
    }, {
      field: 'id',
      headerName: 'Action',
      width: 70,
      renderCell: (params) => {
        const [isLoading, setIsLoading] = useState(false);
        const onDelete = async() => {
          try {
            
            setIsLoading(true);
           
            await axios.delete(`/api/courses/${params.row.id}`);
            toast.success("Course deleted");
          } catch {
            toast.error("Something went wrong")
            
          } finally {
            setIsLoading(false);
          }
        }
        return (
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='inline-flex items-center justify-center h-8 w-8 p-0'>
              <MoreHorizontal className='h-4 w-4'/>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='border-grey bg-white' align='end'>
            <Link href={`/tutor/courses/${params.row.id}`}>
              <DropdownMenuItem className='hover:text-destructive'>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit
              </DropdownMenuItem>
            </Link>
            
              <ConfirmAction onConfirm={onDelete}>
              <button className='flex items-start justify-center' disabled={isLoading}>
              <DropdownMenuItem className='hover:text-destructive'>
                <Trash2 className='h-4 w-4 mr-2'/>
                Delete
              </DropdownMenuItem>
            </button>
              </ConfirmAction>
            

          </DropdownMenuContent>
          
         </DropdownMenu>
        )
      }
    }
  
  
]

const CoursePage = ({data}: Props) => {
  const {theme} = useContext(themeContext);
  
  return (
   <>
   <Container>
    <div className='flex items-center justify-between'>
    <Link href={"/tutor/courses/create"} className='ml-auto'>
       <button className={`button1 bg-success ${theme === 'dark' && 'text-gray'}`}>
        <PlusCircle className='h-4 w-4 mr-2'/>
            New course
        </button>
       </Link>
 

    </div>
    <div className='mt-16'>
      <DataGrid  
     className='!border-grey  !text-gray !font-poppins'
      columns={columns} 
      rowSelection={false}
      rows={data}
      initialState={{
        pagination: {
          paginationModel: {page: 0, pageSize: 5}
        }
      }}
      pageSizeOptions={[5,10,20]}/>
    </div>
   </Container>
   </>
  )
}

export default CoursePage