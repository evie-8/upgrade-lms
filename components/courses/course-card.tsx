"use client";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faSignal } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCurrentUser } from '@/hooks/use-current-user';
import { getPurchaseByUserId } from '@/action-server/get-purchase';
import { Order } from '@prisma/client';


interface Props {
    id: string;
    category: string;
    name: string;
    duration: string;
    level: string;
    status: string;
    cost?: string;
    image: string;

}

const CourseCard: React.FC<Props> = (
    {
        id,
        category, 
        name,
        duration,
        level,
        cost='Free', 
        status,
        image
        }
) => {

  const [purchase, setPurchase] = useState <Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useCurrentUser();
  const onClick = async() => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${id}/checkout`, {
        url: window.location.pathname
      });

      window.location.assign(response.data.url);
    } catch  {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const getPurchase = async () => {
      const order = await getPurchaseByUserId(id, String(user?.id));
      setPurchase(order)
    };

    getPurchase()
  }, 
[user?.id, id])
  return (
    <div className='course-item'>
            <div className='img-wrapper' >
            <img src={image}  alt='course' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5))`}} />
            <p className={`status ${status === 'Open' ? 'bg-danger' : status === 'Closed' ? 'bg-success' : 'bg-warning'}`}>{status}</p>

            </div>

           <div className='content'>

           <p className='category'><span>{category}</span></p>


             <p className='course-title'><Link href={`/courses/${id}/details`}>{name}</Link></p>

             <div className='icon-wrapper'>
              <p>
                <FontAwesomeIcon icon={faClock} fontSize={18} className='text-danger w-4 h-4'/>
                <span>{duration}</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faSignal} fontSize={18} className='text-warning w-4 h-4'/>
                <span>{level}</span>
              </p>
             </div>
             
           </div>

           <div className='course-pay'>
            <p className={`${cost !== 'Free' ? 'text-lg  whitespace-nowrap' : 'text-xl'} `}>{cost}</p>
          {
            user   && !purchase && cost !== 'Free' &&
            <button onClick={onClick} disabled={isLoading} className='link'> {status == 'Open' ? 'Enroll': ''}</button>
          }
           </div>

          </div>
  )
}


const CourseCardList: React.FC<Props> = ({status, level, category, name, duration, cost='Free', image, id}) => {
  const [purchase, setPurchase] = useState <Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useCurrentUser();
  const onClick = async() => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${id}/checkout`, {
        url: window.location.pathname
      });

      window.location.assign(response.data.url);
    } catch  {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    const getPurchase = async () => {
      const order = await getPurchaseByUserId(id, String(user?.id));
      setPurchase(order)
    };

    getPurchase()
  }, 
[user?.id, id])
  return (
    
    <div className="course-item-list ">
      <div className='image-wrapper' >
        <img src={image}  alt='course' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5))`}} />
        <p className={`status ${status === 'Open' ? 'bg-danger' : status === 'Closed' ? 'bg-success' : 'bg-warning'}`}>{status}</p>
      </div>
      <div className="content flex-grow">
     
      <p className='category'><span>{category}</span></p>

          <p className='course-title whitespace-nowrap'><Link href={`/courses/${id}/details`}>{name}</Link></p>
          <div className='icon-wrapper'>
            <p >
              <FontAwesomeIcon icon={faClock} fontSize={18} className='text-danger w-4 h-4'/>
              <span>{duration}</span>
            </p>
            <p>
              <FontAwesomeIcon icon={faSignal} fontSize={18} className='text-warning w-4 h-4'/>
              <span>{level}</span>
            </p>
          </div>
       
       
        <div className='course-pay'>
          <p className={`${cost !== 'Free' ? 'text-[16px]  whitespace-nowrap' : 'text-xl'} `}>{cost}</p>
          {
            user   && !purchase && cost !== 'Free' &&
            <button onClick={onClick} disabled={isLoading} className='link'> {status == 'Open' ? 'Enroll': ''}</button>
          }
        </div>
      </div>
    </div>

    
  
  )
}
export  {CourseCard, CourseCardList}
