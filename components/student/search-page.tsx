"use client"
import { Category } from '@prisma/client'
import React from 'react'
import {FcDatabase, FcMultipleDevices, FcCommandLine } from "react-icons/fc"
import { IconType } from 'react-icons'
import Container from '@/components/ui/container'
import CategoryItem from '@/components/student/category-item'
import SearchButton from '@/components/student/search-button'
import SearchCourseCard from './search-course-card'

interface Props {
    categories: Category[],
    courses: any
}

const iconMap: Record<Category["name"], IconType> = {
      "Data": FcDatabase,
      "Web Development": FcMultipleDevices,
      "Programming": FcCommandLine
}
const SearchPage = ({categories, courses}: Props) => {
    
  return (
    <Container>
        <div className='block sm:hidden mb-5'>
            <SearchButton/>

        </div>
       <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
            {
                categories.map((category) => (
                    <CategoryItem key={category.id} label={category.name} value={category.id} icon={iconMap[category.name]}/>
                ))
            }
       </div>
       <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {
                courses.map((course: any) => 
                    <SearchCourseCard key={course.id} course={course}/>
                )
            }
       </div> 
       {
        courses.length === 0 && (
            <div className='tex-center text-sm mt-10'>
                No courses found

            </div>
        )
       }
         
    </Container>
  )
}

export default SearchPage