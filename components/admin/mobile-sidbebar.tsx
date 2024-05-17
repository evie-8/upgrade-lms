import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import SideBar from './admin-sidebar'

const MobileSideBar = () => {
  return (
    <Sheet>
        <SheetTrigger className='sm:hidden pr-4 hover:opacity-75 transition'>
            <Menu size={25} className='font-bold'/>
        </SheetTrigger>
        <SheetContent side="left" className='p-0 bg-white'>
            <SideBar/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileSideBar