import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios';

const PagesEntry = ({ CloseEntryPages, title, google_id, author, cover, genre, refreshWishlist }) => {
    const [pages, setPages] = useState("");

    const handlePagesSubmit = async () => {
        if (pages === "") {
            toast.error("Enter the total pages.");
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/reading/add', {
                google_id,
                title,
                author,
                cover_url: cover,
                genre,
                pages
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            toast.success(`${title} added to currently reading`);
            CloseEntryPages();
            refreshWishlist(); // ✅ remove from wishlist after adding
        } catch (err) {
            toast.error("Failed to add book");
            console.error(err);
        }
    };
    return (
        <div className='fixed inset-0 backdrop-blur-sm z-10 flex justify-center items-center'>
            <div style={{ boxShadow: "4px 4px 7px black" }} className='bg-amber-100 w-[40%] relative p-6'>
                <button onClick={CloseEntryPages} className=' text-2xl absolute top-1.5 right-4'>×</button>
                <div className='flex flex-col items-center'>
                    <h1>Enter the total pages of <span className='font-bold'>{title}</span> as it is currently <span className='italic'>"Unknown"</span></h1>
                    <input onChange={(e) => setPages(e.target.value)} value={pages} className='bg-white my-10 p-2.5 rounded-2xl' type="number" placeholder='Total Pages'></input>
                    <button onClick={handlePagesSubmit}
                        className='absolute bottom-1 right-3 font-semibold text-white text-xl bg-blue-500 rounded-full px-4 py-1 my-5 hover:scale-105 hover:bg-blue-700'>
                        Submit</button>
                </div></div>
        </div>
    )
}

export default PagesEntry