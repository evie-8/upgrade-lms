"use client";
import { useCurrentUser } from '@/hooks/use-current-user'
import { LogOut, MoonStar, Settings, Sun, UserRound } from 'lucide-react'
import Image from 'next/image';
import { useContext } from 'react';
import { themeContext } from '@/components/theme';
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Link from 'next/link';
import { logout } from '@/action-server/logout';

const ProfileImage =   () => {
  const user = useCurrentUser();
  const {theme, setTheme} = useContext(themeContext);
  const pathname = usePathname();
  const showName = pathname.startsWith("/tutor") || pathname.startsWith("/student");
  const href = user?.role === 'TUTOR' ? '/tutor/settings': '/student/settings'

    const changeTheme = () => {
        setTheme((prev: string) => prev === 'light' ? 'dark': 'light')
      
    }
  return (
    <div className='flex items-center justify-between ml-auto'>
      <button onClick={changeTheme} className=' hidden items-center justify-center mr-2'>
        {
          theme === 'light' ? <MoonStar className='w-4 h-4'/> : <Sun className='h-4 w-4'/>
        }
      </button>

     {
      showName && 
      <h2 className="max-sm:hidden text-sm mr-2">{user?.name}</h2>
     }

     
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <div className={`flex gap-3 items-center justify-center rounded-full ${!user?.image && 'bg-blue1'} w-8 h-8 border border-transparent`}>   
          {
          user && user.image ? 
            <Image src={user?.image} alt='profile image' width={32}  height={32} className='rounded-full'/> : 
            <UserRound  className='text-white'/>
           }
         
        </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='border-grey bg-white'  align='end'>
        
          
            {
              !showName &&
              <Link href={href}>
              <DropdownMenuItem className='hover:text-destructive'>
            <button className='flex items-center justify-center'>
              <Settings size={18} className='mr-2 font-semibold'/>
              settings
            </button>
            </DropdownMenuItem>
            </Link>
            }

        <DropdownMenuItem className='hover:text-destructive'>
            <button className='flex items-center justify-center' onClick={() => logout()}>
              <LogOut size={18} className='mr-2 font-semibold'/>
              sign out
            </button>
            </DropdownMenuItem>
        
        </DropdownMenuContent>
     </DropdownMenu>
         
    </div>
  )
}

export default ProfileImage