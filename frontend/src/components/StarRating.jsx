import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const StarRating = ({ size, backgroundColor, ratingGiven, setRatingGiven }) => {
    const [hover, setHover] = useState(null);


    return (
        <div className='flex gap-2 items-center'>
            <div className='flex'>
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <label key={starValue}>
                            <input className='hidden' type='radio' name='rating' value={starValue} onClick={() => setRatingGiven(starValue)}></input>
                            <FaStar size={size}
                                className='cursor-pointer transition-colors'
                                color={
                                    starValue <= (hover || ratingGiven)
                                        ? '#ffc107' // gold
                                        : backgroundColor // gray
                                }
                                onMouseEnter={() => setHover(starValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    )

                })}

            </div>
            {ratingGiven > 0 && <p className='text-sm italic'>Rating Given : {ratingGiven}/5 </p>}
        </div>
    )
}

export default StarRating