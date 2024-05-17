import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar } from '@fortawesome/free-solid-svg-icons';

interface Props {
  name: String;
  role: String;
}

const ReviewCard: React.FC<Props> = ({name, role}) => {
  return (
    <div className='review-wrapper'>
                  <div className='profile-wrapper'>
                  <div className='profile-img-wrapper '> 
                      <Image src={'/images/profile.jpg'} width={56} height={56} alt='profile-image'/>
                    </div>
                    <div className='contents'>
                        <p className='name'>{name}</p>
                        <p className='role'>{role}</p>
                        <div className='ranking'>
                          <FontAwesomeIcon icon={faStar} className='icon'/>
                          <FontAwesomeIcon icon={faStar} className='icon'/>
                          <FontAwesomeIcon icon={faStar} className='icon'/>
                          <FontAwesomeIcon icon={faStar} className='icon'/>
                          <FontAwesomeIcon icon={faStar} className='icon'/>
                        </div>
                      </div>
                  </div>

                  <p className='review'>
                    Highly Recommended! The personalized feedback and real-world applications in the course have elevated my understanding
                  </p>

                </div>

  )
}

export default ReviewCard