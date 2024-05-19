"use client"
import { themeContext } from '@/components/theme'
import Container from '@/components/ui/container'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useContext } from 'react'

const CoursePage = () => {
  const {theme} = useContext(themeContext)
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
   </Container>
   </>
  )
}

export default CoursePage