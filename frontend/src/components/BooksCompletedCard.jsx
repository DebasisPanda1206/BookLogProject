import React from 'react'

const BooksCompletedCard = ({ name, author, cover, genre, t_pages, reviewed, ReviewEditOn }) => {
    return (
        <div className='bg-black text-white rounded-xl relative'>
            <div className='w-full'><img className='h-72 w-full rounded-t-xl' src={cover} alt={name}></img></div>
            <div className='p-4 pb-8'>
                <h1 className='text-xl'>{name}</h1>
                <p className='text-sm'>by <span className='italic font-bold '>{author}</span></p>
                <p className='text-sm mt-2'>Genre <span className='font-bold'>{genre}</span></p>
                <p className='text-sm'>Pages <span className='font-bold'>{t_pages}</span></p>
            </div>
            {!reviewed && <button className='py-0.5 px-2 text-white bg-transparent rounded-full border-2 border-white hover:text-black hover:bg-white hover:cursor-pointer absolute right-2 bottom-2' onClick={ReviewEditOn}>Review</button>}
        </div>
    )
}

export default BooksCompletedCard