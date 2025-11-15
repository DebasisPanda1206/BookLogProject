import React, { useState, useEffect } from 'react'
import { reviewed_books } from '../assets/sampleData'
import { FaStar } from 'react-icons/fa'
import ViewReview from '../components/ViewReview'
import useAuth from '../utils/auth';
import axios from 'axios';

const ReviewPage = () => {
    const [anyReviews, set_anyReviews] = useState(true);
    const [reviews, setReviews] = useState([]);

    const [viewReview, set_viewReview] = useState(false);
    const [bookDetails, setBookDetails] = useState({});
    const token = useAuth();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/reviews/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setReviews(res.data);
                set_anyReviews(res.data.length > 0);
            } catch (err) {
                console.error('Failed to fetch reviews:', err);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div>
            {token ? (
                <div>
                    <h1 style={{ fontFamily: "Noto Serif Display,serif" }} className='font-serif text-4xl font-bold text-white'>Your Reviews</h1>
                    {anyReviews ? (
                        <div className='py-10 px-5 grid grid-cols-4 gap-8'>
                            {reviews.map((book) => (
                                <div onClick={() => {
                                    set_viewReview(true);
                                    setBookDetails({ title: book.name, author: book.author, coverUrl: book.coverUrl, rating: book.rating, genre: book.genre, review: book.bookReview, date: book.reviewedOn });
                                }}
                                    key={book.id} className='bg-[rgba(0,0,0,0.7)] text-white rounded-xl hover:scale-105 transition-all duration-300 overflow-hidden'>
                                    <div style={{ boxShadow: "2px 0px 2px gray" }} className='w-full'><img className='h-72 w-full rounded-t-xl' src={book.coverUrl} alt={book.name}></img></div>
                                    <div className='p-4'>
                                        <h1 className='text-xl'>{book.name}</h1>
                                        <p className='text-sm'>by <span className='italic font-bold '>{book.author}</span></p>
                                        <p className='text-sm mt-2 mb-2'>Genre <span className='font-bold'>{book.genre}</span></p>
                                        <div className='flex gap-0.5'>
                                            {[...Array(5)].map((_, index) => {
                                                return (
                                                    < FaStar key={index} size={15} color={index < book.rating ? '#ffc107' : 'black'} style={{ stroke: 'white', strokeWidth: 15 }} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>)
                            )}</div>
                    ) : (
                        <div className='mx-auto my-5 flex justify-center items-center w-full '>
                            <p className='p-5 w-full text-xl bg-[rgba(0,0,0,0.6)] text-white rounded-xl text-center'>Currently you have not reviewed any books.</p>
                        </div>
                    )}

                    {viewReview && <ViewReview viewReviewClose={() => set_viewReview(false)}
                        title={bookDetails.title}
                        author={bookDetails.author}
                        coverURL={bookDetails.coverUrl}
                        genre={bookDetails.genre}
                        rating={bookDetails.rating}
                        review={bookDetails.review}
                        date={bookDetails.date}
                        refreshPage={() => fetchReviews()}
                    />}
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <p className="bg-[rgba(0,0,0,0.6)] text-white text-xl font-semibold px-6 py-4 rounded-xl shadow-md text-center">
                        Login to BookStack to see the Reviewed Books
                    </p>
                </div>
            )}
        </div>
    )
}

export default ReviewPage