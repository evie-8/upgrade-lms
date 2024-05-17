import React from 'react'
import MenuItem from './menu-item'


interface Props {
    collapse?: boolean;
    routes :any[]
    
}

const SideBarRoutes: React.FC<Props> = ({collapse, routes}) => {
  return (
    <div className={`flex flex-col w-full gap-y-2 mt-2 p-2`}>
       {
        routes.map((route) => {
           return <MenuItem key={route.href}  href={route.href} icon={route.icon}label={route.label} collapse={collapse} />
        })
       }

      
   
    </div>
  )
}

export default SideBarRoutes