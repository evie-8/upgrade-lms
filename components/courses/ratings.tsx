"use client";
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const ratingMeaning = ['Very Poor 😞', 'Poor 😕', 'Average 😐', 'Good 🙂', 'Excellent 😃']

const Ratings = () => {
    const [rating, setRating] = useState<any>(null);
    const [hover, setHover] = useState<any>(null);
  return (
    <div className='gap-1 flex'>
        {
            [...Array(5)].map((star, index) => {
                const current = index + 1;
                return (
                   
                    <label>
                        <input 
                        className='hidden'
                        type="radio"
                        name='rating'
                        value={current}
                        onClick={() => setRating(current)}/>
                     <FontAwesomeIcon icon={faStar}
                     className={`w-5 h-5 cursor-pointer ${current <= (hover || rating) ? 'text-ranking' : 'text-grey'}`}
                     onMouseEnter={() => setHover(current)} 
                     onMouseLeave={() => setHover(null)}/>
                     </label>
                    );
                 
            })
        }
        <p className='mx-5 text-primary font-semibold'>{rating !== null && ratingMeaning[rating - 1]}</p>
    </div>
  )
}

export default Ratings