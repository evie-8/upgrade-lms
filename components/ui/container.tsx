import React from 'react'

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <div className='mx-auto p-8 md:px-20 md:py-8 '>
        {children}
        
    </div>
  )
}

export default Container