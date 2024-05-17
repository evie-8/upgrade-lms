"use client";

import { useState } from 'react'
import SideBar from './admin-sidebar'
import Header from './header'
import { ChevronRight } from 'lucide-react';
import Container from '@/components/ui/container';
import Animation from '../ui/animation';



interface Props {
    children: React.ReactNode;
    
  }
const Content: React.FC<Props> = ({children}) => {
    const [collapse, setCollapse] = useState(false);
  return (
    <>
      <div className={`hidden h-full sm:flex flex-col fixed z-20 inset-y-0 bg-white transition-all  ${collapse ?'w-20':'w-56' }`}>
      <SideBar collapse={collapse} />
      <button className="hidden absolute -right-2 sm:top-[3%] lg:top-[4%] w-5 h-5 sm:flex items-center justify-center rounded-full border bg-white border-transparent shadow-xs z-30" onClick={() => setCollapse((prev: boolean) => !prev)}>
          <ChevronRight size={20} className={`transition-all duration-[0.2s]  ${collapse ? '' : 'transform rotate-180'}`}/>
        </button>
      </div>
     
    <main className={`relative h-full min-h-screen bg-white ${collapse ? 'sm:pl-20' : 'sm:pl-56'} relative`}>
    <Header collapse={collapse}/>
        
       <Animation>
       {children}
       </Animation>
        
    </main>
    </>
  )
}

export default Content