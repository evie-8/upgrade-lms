"use client"

import LineChart from '@/components/graphs/line-chart'
import { FcLike, FcManager, FcMoneyTransfer, FcSalesPerformance } from 'react-icons/fc'
import { formatter } from '@/lib/utils'
import CircularProgress from '@mui/joy/CircularProgress';
import { Box } from '@mui/material'
import BarChart from '@/components/graphs/bar-chart'

const TutorDashboard = () => {
  
  return (
    <section className='p-6 h-full min-h-screen bg-white1'>

        <div className='grid  max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-12  gap-4 w-full my-3'>
          <div className='lg:col-span-3  max-lg:col-span-1 flex  items-center justify-between gap-2 rounded-lg bg-white p-3'>
        <div className='flex flex-col'>
              <FcMoneyTransfer size={30}/>
              <p className='font-bold'>{formatter(560000)}</p>
              <p className='text-primary text-sm font-semibold'>Revenue generated</p>
            </div>
            <div className='flex flex-col '>
            <CircularProgress size={'md'} color="success"  determinate value={25} />
            <span className='text-sm italic text-success'>+5%</span>
            </div>
          </div>

          <div className='lg:col-span-3 max-lg:col-span-1 flex  items-center justify-between gap-2 rounded-lg bg-white p-3'>
            <div className='flex flex-col'>
              <FcManager size={30}/>
              <p className='font-bold'>5</p>
              <p className='text-primary text-sm font-semibold'>New users</p>
            </div>
            <div className='flex flex-col '>
            <CircularProgress size={'md'} color='danger' determinate value={35} />
            <span className='text-sm italic text-destructive'>-10%</span>
            </div>
          </div>
         
          <div className='lg:col-span-3 max-lg:col-span-1 flex  items-center justify-between gap-2 rounded-lg bg-white p-3'>
            <div className='flex flex-col'>
              <FcSalesPerformance size={30}/>
              <p className='font-bold'>3</p>
              <p className='text-primary text-sm font-semibold'>Sales obtained</p>
            </div>
            <div className='flex flex-col '>
            <CircularProgress size={'md'} color='success'  determinate value={20} />
            <span className='text-sm italic text-success'>+2%</span>
            </div>
          </div>

          <div className='lg:col-span-3  max-lg:col-span-1 flex items-center justify-between gap-2 rounded-lg bg-white p-3'>
            <div className='flex flex-col'>
              <FcLike size={30}/>
              <p className='font-bold'>80</p>
              <p className='text-primary text-sm font-semibold'>Customer Satisfaction</p>
            </div>
            <div className='flex flex-col'>
              <CircularProgress size={'md'} color='success' determinate value={80} />
              <span className='text-sm italic text-success'>+10%</span>
    </div>
           </div>
         
        </div>
       <section className='relative grid max-xl:grid-cols-1 xl:grid-cols-12 gap-6'>
       <article className='xl:col-span-7 w-full'>
         
       <h2 className='text-center font-bold text-xl p-2 my-3'>Revenue Analytics</h2>
       
         <div className=' bg-white  rounded-lg shadow-md'>
       
       
             <LineChart/>
         </div>
        </article>

        <article className='xl:col-span-5 w-full '>
      <h2 className='text-center font-bold text-xl p-2 my-3 '>Sales Analytics</h2>
     <div className=' bg-white  rounded-lg shadow-md'>
     <Box height={'50vh'}>  
        <BarChart/>
      </Box>
     </div>
         

        </article>
       </section>
    </section>
  )
}

export default TutorDashboard