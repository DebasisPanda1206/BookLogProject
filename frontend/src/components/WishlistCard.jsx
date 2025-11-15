import React, { useState } from 'react'
import PagesEntry from './PagesEntry';
import toast from 'react-hot-toast';
import axios from 'axios';

const WishlistCard = ({ name, author, cover, genre, t_pages, google_id, refreshWishlist }) => {
    const [requirePageEntry, set_requirePageEntry] = useState(false);

    const handle_AddtoCurrent = async () => {
        if (t_pages === "Unknown") {
            set_requirePageEntry(true);
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/reading/add', {
                google_id,
                title: name,
                author,
                cover_url: cover,
                genre,
                pages: t_pages
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            toast.success(`${name} added to currently reading`);
            await handleRemove(); // ✅ remove from wishlist after adding
        } catch (err) {
            toast.error('Failed to add to currently reading');
            console.error(err);
        }
    };
    const handleRemove = async () => {
        try {
            await axios.delete('http://localhost:5000/api/wishlist/remove', {
                data: { google_id },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success(`${name} removed from wishlist`);
            refreshWishlist(); // ✅ trigger parent refresh
        } catch (err) {
            toast.error('Failed to remove book');
            console.error(err);
        }
    };


    return (
        <div className='flex p-2.5 bg-[rgba(255,255,255,0.7)] rounded-2xl relative'>
            <div className='flex-shrink-0'><img style={{ boxShadow: "0px 0px 5px black" }} className='h-48 w-32 object-cover ' src={cover} alt={name}></img></div>
            <div className='px-2.5 py-0.5'>
                <h1 className='text-2xl font-semibold'>{name}</h1>
                <p className='text-sm'>by <span className='italic font-semibold'>{author}</span></p>
                <div className='flex gap-2 py-2'>
                    <p className='font-bold'>Genre <span className='italic font-normal'>{genre}</span></p>
                    <p className='font-bold'>Pages <span className='italic font-normal'>{t_pages}</span></p>
                </div>
                <div className='flex gap-2 absolute bottom-3 right-3'>
                    <button style={{ boxShadow: "1px 1px 3px rgba(25,25,25,0.8)" }} className='py-1 px-2 rounded-full text-white bg-blue-500 font-bold hover:scale-105 hover:bg-blue-700'
                        onClick={handle_AddtoCurrent}>
                        Add</button>
                    <button onClick={handleRemove} style={{ boxShadow: "1px 1px 3px rgba(25,25,25,0.8)" }} className='py-1 px-2 rounded-full text-white bg-red-500 font-bold hover:scale-105 hover:bg-red-700'>Remove</button>
                </div>
            </div>
            {requirePageEntry && <PagesEntry CloseEntryPages={() => set_requirePageEntry(false)} title={name} />}
        </div>
    )
}

export default WishlistCard