"use client"
import { Category } from '@prisma/client'
import React from 'react'
import {FcDatabase, FcMultipleDevices, FcCommandLine } from "react-icons/fc"
import { IconType } from 'react-icons'
import Container from '@/components/ui/container'
import CategoryItem from '@/components/student/category-item'
import SearchButton from '@/components/student/search-button'

interface Props {
    categories: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
      "Data": FcDatabase,
      "Web Development": FcMultipleDevices,
      "Programming": FcCommandLine
}
const SearchPage = ({categories}: Props) => {
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
    </Container>
  )
}

export default SearchPage