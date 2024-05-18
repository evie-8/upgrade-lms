import Container from '@/components/ui/container'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

const CoursePage = () => {
  return (
   <>
   <Container>
    <div className='flex items-center justify-between'>
    <Link href={"/tutor/courses/create"} className='ml-auto'>
       <button className='button1 bg-success'>
        <PlusCircle className='h-4 w-4 mr-2'/>
            New course
        </button>
       </Link>
 

    </div>
   </Container>
   </>
  )
}

export default CoursePage