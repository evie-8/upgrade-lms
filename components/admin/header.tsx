import React from 'react'
import MobileSideBar from './mobile-sidbebar';
import ProfileImage from './avartar';

interface Props {
    collapse: boolean;
}
const Header: React.FC<Props> = ({collapse}) => {
  return (
    <div className={`${collapse ? ' h-[71px]' :'h-[73px]'} z-10 p-8 border-b border-grey flex items-center bg-white sticky top-0 left-0`}>
        <MobileSideBar/>
        <ProfileImage/>
       
    </div>
  )
}

export default Header