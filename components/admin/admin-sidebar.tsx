"use client";

import Image from "next/image";
import SideBarRoutes from "./sidebar-routes";

import MenuItem from "./menu-item";
import logo from "../../public/logo.svg";
import { BookOpen, Database, HelpCircle, Home, LogOut, Receipt, Settings, Users2 } from 'lucide-react'

interface Props {
  collapse?: boolean;
  
}

const routes = [
  {
      icon: Home,
      label: 'Home',
      href:'/tutor/dashboard',
  },

  {
      icon: BookOpen,
      label: 'Courses',
      href:'/tutor/courses',
  },
  {
      icon: HelpCircle,
      label: 'Quizzes',
      href:'/tutor/quizzes',
  },
 
  
]

const routes1 = [
  {
      icon: Database,
      label: 'Analytics',
      href:'/tutor/user-analytics',
  },

  {
      icon: Receipt,
      label: 'Invoices',
      href:'/tutor/orders',
  },
  {
      icon: Users2,
      label: 'Users',
      href:'/tutor/users',
  }, 
  
]

const SideBar:React.FC<Props> =  ({collapse}) => {
  
  return (

  
    
      <section className="h-full border-r border-r-grey flex flex-col items-center max-sm:shadow-xs">
     <div className=" w-full border-b border-b-grey sticky top-0 left-0 bg-white">
     <div className=" p-5 flex items-start justify-start gap-2 flex-nowrap">
          <Image alt="logo" width={30} height={30} src={logo}/>
          <p className={`font-bold text-2xl ${collapse ?"hidden" :"block"}`}>up<span className="text-primary">grade</span></p>
      </div>
     </div>

      <div className="flex flex-col w-full overflow-y-auto   bg-white" >
          < SideBarRoutes collapse={collapse} routes={routes}/>
         
         <hr  className="text-grey"/>
        < SideBarRoutes collapse={collapse} routes={routes1}/>
         
      </div>
      
    
      <div className="flex flex-col w-full sticky bottom-0 left-0 border-t border-t-grey  p-2 bg-white mt-auto">
        <MenuItem href="/settings" icon={Settings} label="Settings" collapse={collapse} />
        <MenuItem href="/logout" icon={LogOut} label="Logout" collapse={collapse} signout={true}/>
      </div>

        
       </section>
     
     
  
   
  )
}

export default SideBar