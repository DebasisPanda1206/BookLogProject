import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const SearchResultCard = ({ title, author, cover, genre, pages, published, google_id }) => {

    const handleAddBook = async () => {
        try {
            const res = await axios.post(
                'http://localhost:5000/api/wishlist/add',
                {
                    google_id,
                    title,
                    author,
                    cover_url: cover,
                    genre,
                    pages: pages === 'Unknown' ? null : pages,
                    published
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            toast.success(`${title} added to your wishlist`);
        } catch (err) {
            if (err.response?.status === 409) {
                toast.error('Book already in wishlist');
            } else {
                toast.error('Failed to add book');
                console.error(err);
            }
        }

    }

    return (
        <div style={{ boxShadow: "0px 0px 5px rgba(5,5,5,0.8)" }} className='text-white bg-[rgba(6,6,6,0.6)] rounded-2xl relative'>
            <div className='w-full flex justify-center'><img className='h-80 w-full rounded-t-2xl' src={cover}></img></div>
            <div className='px-4 pt-1 pb-10'>
                <h1 className='text-xl font-semibold leading-tight'>{title}</h1>
                <p className='text-sm'>by <span className='italic font-semibold'>{author}</span></p>
                <p className='mt-2'>Genre <span className='italic font-semibold'>{genre}</span></p>
                <p>Pages <span className='italic font-semibold'>{pages}</span></p>
                <p>Published <span className='italic font-semibold'>{published}</span></p>
            </div>
            <button onClick={handleAddBook}
                className='bg-red-500 px-5 py-1 rounded-full text-white font-semibold absolute bottom-1.5 right-2.5 hover:bg-red-700 hover:scale-105 hover:cursor-pointer'>Add</button>
        </div>
    )
}

export default SearchResultCard