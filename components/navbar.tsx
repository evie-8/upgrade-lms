"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../public/logo.svg"
import { LogIn } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import ProfileImage from "@/components/admin/avartar";

const NavBar = () => {
    const pathname = usePathname();
    const [scroll, setScroll] = useState(false);
    const [menu, setMenu] = useState(false);
    const user = useCurrentUser();

    const links = [
        {
          link: '/',
          name: 'Home',
          active: pathname === '/'
        },
        {
            link: '/courses',
            name: 'Courses',
            active: pathname === '/courses' || pathname.startsWith("/courses")
          },
        {
          link: '/about-us',
          name: 'About Us',
          active: pathname === '/about-us'
        },
       
    ];
   
    const handleClick = () => {
      setMenu(prev => !prev)
    }

  useEffect(() => {
    
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
          if (window.scrollY) {
              setScroll(true);
              setMenu(false);
          } else {
              setScroll(false);
          }
      }
  };
    window.addEventListener("scroll", handleScroll);

  }, []);
   
  return (
    <header className={`${scroll ? 'bg-white shadow-md sticky left-0 top-0': ''} ${menu ? 'bg-white' : ''}`}>
        <div>
        <Link href="/" className="flex items-center justify-center gap-2 flex-nowrap">
        <Image alt="logo" width={30} height={30} src={logo}/>
        <p className={`font-bold text-2xl`}>up<span className="text-primary">grade</span></p>
      </Link>
        </div>
        <div className={`nav-menu ${menu ? 'active': ''}`} >
          
                <ul>
                    {links.map((link) => (
                        <li key= {link.link} className={`${link.active ? 'active' : ''}`}><Link href={link.link}>{link.name}</Link></li>             
                        ))}
                        
                    </ul>

               {
                user ?
                <ProfileImage/> :

                <Link href={'/auth/sign-in'}>
                <button className="inline-flex items-center justify-center flex-nowrap "> <LogIn className="w-5 h-5 mr-2 font-bold"/> Sign In</button>            
                </Link>
               }
        </div>

          <p className={`menu ${menu ? 'active' : ''}`} onClick={handleClick}>
                <span></span>
                <span></span>
                <span></span>
            </p>
      
                
     
          
    </header>
  )
}

export default NavBar