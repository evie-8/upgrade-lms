import { ReactNode } from 'react'
import Heading from '@/components/auth/heading';
import SocialButtons from '@/components/auth/social-buttons';
import Link from 'next/link';
import Animation from '@/components/ui/animation';

interface Props {
    headerLabel: string;
    messageLabel: string;
    children: ReactNode;
    socials?: boolean;
    backref: string;
    backrefMessage: string;
    backrefDescription?: string;
    
}

const AuthCard: React.FC<Props> = ({
    children,
    headerLabel,
    messageLabel,
    socials,
    backref,
    backrefDescription,
    backrefMessage
}) => {
  return (
    <Animation>
        <section className=" w-full min-h-screen flex flex-col items-center justify-center">
     
    <div className="w-[92%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[32%] h-auto py-10 px-12 rounded-xl bg-white  border-2 border-transparent border-opacity-[0.61] z-30 authcard my-4">
        <Heading title={headerLabel} message={messageLabel}/>
   
        {socials &&
        <SocialButtons/>
        }
        {
          children
        }

        
        <div className="w-full h-auto flex items-center justify-center gap-x-1">
            <p className="text-sm font-medium">{backrefDescription}</p>
            <Link href={backref} className="text-sm font-medium hover:underline hover:text-primary ease-out duration-[0.3s]">{backrefMessage}</Link>
        </div>
       
    </div>

        
    </section>
    </Animation>
  )
}

export default AuthCard