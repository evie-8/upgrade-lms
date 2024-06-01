import { useCurrentUser } from '@/hooks/use-current-user'
import { MoonStar, Sun, UserRound } from 'lucide-react'
import Image from 'next/image';
import { useContext } from 'react';
import { themeContext } from '@/components/theme';


const ProfileImage =   () => {
  const user = useCurrentUser();
  const {theme, setTheme} = useContext(themeContext)

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

      <div className={`flex gap-3 items-center justify-center rounded-full ${!user?.image && 'bg-blue1'} w-8 h-8 border border-transparent`}>
          
        {
        user && user.image ? 
          <Image src={user?.image} alt='profile image' width={32}  height={32} className='rounded-full'/> : 
          <UserRound  className='text-white'/>
         }
       
      </div>
            </div>
  )
}

export default ProfileImage