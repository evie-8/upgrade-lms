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
    <div className='flex items-center justify-between ml-auto '>
      <button onClick={changeTheme} className='mr-4'>
        {
          theme === 'light' ? <MoonStar className='w-4 h-4'/> : <Sun className='h-4 w-4'/>
        }
      </button>

      <div className='rounded-full bg-blue1 w-6 h-6 border border-transparent'>
          
        {user && user.image ? <Image src={user?.image} alt='profile image' width={24}  height={24} className='rounded-full'/> :  <UserRound className='text-white'/>}
   
      </div>
            </div>
  )
}

export default ProfileImage