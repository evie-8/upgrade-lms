import { useCurrentUser } from '@/hooks/use-current-user'
import { UserRound } from 'lucide-react'
import Image from 'next/image';


const ProfileImage =   () => {
  const user = useCurrentUser();
  return (
    <div className='flex items-center justify-center ml-auto rounded-full bg-blue1 w-10 h-10 border border-transparent'>
           
            {user && user.image ? <Image src={user?.image} alt='profile image' width={40} height={40}  className='rounded-full'/> :  <UserRound className='text-white'/>}
    </div>
  )
}

export default ProfileImage