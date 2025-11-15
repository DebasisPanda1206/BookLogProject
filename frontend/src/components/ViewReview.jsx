import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import ReviewForm from './ReviewForm';


const ViewReview = ({ viewReviewClose, title, author, coverURL, genre, rating, review, date }) => {
    const [edit, setEdit] = useState(false);
    return (
        <div>
            <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
                <div className='bg-amber-100 w-[60%] flex relative'>
                    <button onClick={viewReviewClose} className='text-2xl hover:scale-110 absolute right-4 top-1.5'>×</button>
                    <div className='flex gap-2.5 pt-8 pb-5'>
                        <div className='p-5'><img className='h-72 w-52' src={coverURL}
                            alt={title} onError={(e) => e.target.src = "https://booksandyou.in/cdn/shop/files/HarryPotterBoxSetCursedChild_beb3a56c-0d20-4c82-9267-69c684b534e6.jpg?v=1696398244&width=416"} /></div>
                        <div className='p-4 flex-1'>
                            <h1 className='text-3xl italic '>{title}</h1>
                            <p>by <span className='italic font-bold'>{author}</span></p>
                            <p className='font-bold text-lg my-2.5'>Genre <span className='italic font-normal'>{genre}</span></p>
                            <div className='flex gap-3 items-center'>
                                <div className='flex gap-0.5'>
                                    {[...Array(5)].map((_, index) => {
                                        return (
                                            < FaStar key={index} size={20} color={index < rating ? '#ffc107' : 'black'} style={{ stroke: 'white', strokeWidth: 15 }} />
                                        )
                                    })}
                                </div>
                                <p className='text-md italic'>Reviewed : {rating}/5</p>
                            </div>
                            <p className='text-lg italic mt-5'>{review}</p>
                            <p>Reviewed on <span className='italic'>{date}</span></p>
                        </div>
                    </div>
                    <button onClick={() => setEdit(true)}
                        className='font-semibold text-white text-lg bg-blue-500 rounded-full px-3 py-1 hover:scale-105 hover:bg-blue-700 absolute right-5 bottom-3'>
                        Edit</button>
                </div>
            </div>
            {edit && <ReviewForm title={title} author={author} coverURL={coverURL} EditClose={() => setEdit(false)} ReviewClose={() => viewReviewClose()} google_id={google_id} />}
        </div>
    )
}

export default ViewReview