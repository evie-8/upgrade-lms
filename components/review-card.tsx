import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar } from '@fortawesome/free-solid-svg-icons';
import { Review } from '@prisma/client';
import { User } from 'next-auth';
import { getFullDay } from '@/lib/date';

interface Props {
  
 
  review?: Review & {reviewer: User}
}

const ReviewCard: React.FC<Props> = ({review}) => {
  return (
    <div className='min-w-[330px] bg-white shadow-custom rounded-lg p-8 '>
        <div className='flex justify-between gap-3'>
        <div className='flex items-start justify-start gap-3'>
            <div className=' flex  items-center justify-center w-12 h-12 rounded-full border-2 border-primary '> 
                <Image src={review?.reviewer.image} width={48} height={48} alt='profile-image' className=' w-full h-auto rounded-full  m-1'/>
              </div>
            <div className='my-auto flex flex-col'>
                <p className='text-sm font-bold text-primary'>{review?.reviewer.name}</p>
                <p className='text-sm text-gray/60'>{getFullDay(review?.createdAt)}</p>
                
                
                
            </div>

        </div>
                

        </div>

        <div className='flex gap-2 items-center justify-center mt-1'>
                        
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className={`w-3 h-3  ${index < review?.rating ? 'text-ranking': 'text-grey'}  `} />
        ))}  
          <p className='text-sm font-semibold'>{review?.ratingDescription}</p>
                             
        </div>
        <p className='text-sm font-normal my-3'>
                {review?.review}
        </p>

      </div>

  )
}

export default ReviewCard