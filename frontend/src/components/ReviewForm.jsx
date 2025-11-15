import React, { useState } from 'react'
import StarRating from './StarRating'
import toast from 'react-hot-toast'
import axios from 'axios'

const ReviewForm = ({ title, author, coverURL, google_id, EditClose, ReviewClose, refreshPage }) => {
    const [ratingGiven, setRatingGiven] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const handle_Submit = async () => {
        if (ratingGiven === 0) {
            toast.error("Ratings not given");
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/reviews/add', {
                google_id,
                rating: ratingGiven,
                review_text: reviewText
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            toast.success(`Review for ${title} submitted successfully!`);
            refreshPage()
            EditClose();
            if (typeof ReviewClose === 'function') {
                ReviewClose(); // ✅ safe to call
            }
            refreshPage?.()
        } catch (err) {
            toast.error("Failed to submit review");
            console.error(err);
        }
    };
    return (
        <div className='fixed inset-0 bg-transparent  backdrop-blur-sm z-10 flex justify-center items-center'>
            <div style={{ boxShadow: "5px 5px 15px black" }} className='bg-amber-100 w-[58%] p-4 pt-10 pb-6 relative'>
                <button className='text-3xl absolute right-2.5 top-1 hover:scale-105 hover:cursor-pointer' onClick={EditClose}>×</button>
                <div className='flex'>
                    <div><img style={{ boxShadow: "2px 2px 4px rgba(0,0,0,0.8)" }} className='h-92 w-64' src={coverURL}></img></div>
                    <div className='p-4 pl-6 flex-1'>
                        <h1 className='text-3xl italic'>{title}</h1>
                        <p>by <span className='italic font-bold'>{author}</span></p>
                        <div className='py-5'>
                            <p>Rate this book</p>
                            <StarRating size={20} backgroundColor={"#ffffff"} ratingGiven={ratingGiven} setRatingGiven={setRatingGiven} />
                        </div>
                        <textarea
                            cols={6}
                            rows={3}
                            placeholder='Give your review'
                            className='bg-white rounded-sm p-4 w-full'
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <button onClick={handle_Submit}
                            className='font-semibold text-white text-lg bg-blue-500 rounded-full px-3 py-1 hover:scale-105 hover:bg-blue-700 absolute right-5 bottom-3'>
                            Submit</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ReviewForm