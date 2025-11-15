import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

const ProgessPagesForm = ({ CloseEntryPages, title, pages_completed, total_pages, google_id, refreshReading }) => {
    const [pages, setPages] = useState("");

    const handlePagesSubmit = async () => {
        const entered = parseInt(pages);

        if (isNaN(entered)) {
            toast.error("Please enter a valid number");
            return;
        }

        if (entered < pages_completed) {
            toast.error("Pages can't be decreased");
            return;
        }

        if (entered > total_pages) {
            toast.error("Pages can't exceed total pages");
            return;
        }

        try {
            await axios.patch('http://localhost:5000/api/reading/progress', {
                google_id,
                pages_completed: entered
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            toast.success("Progress updated successfully!");
            CloseEntryPages();
            refreshReading();
        } catch (err) {
            toast.error("Failed to update progress");
            console.error(err);
        }
    };

    return (
        <div className='fixed inset-0 backdrop-blur-sm z-10 flex justify-center items-center'>
            <div style={{ boxShadow: "4px 4px 7px black" }} className='bg-amber-100 w-[40%] relative p-6'>
                <button onClick={CloseEntryPages} className=' text-2xl absolute top-1.5 right-4'>×</button>
                <div className='flex flex-col items-center'>
                    <h1>Enter the pages completed of <span className='font-bold'>{title}</span></h1>
                    <input onChange={(e) => setPages(e.target.value)} value={pages} className='bg-white my-10 p-2.5 rounded-2xl' type="number" placeholder={pages_completed}></input>
                    <button onClick={handlePagesSubmit}
                        className='absolute bottom-1 right-3 font-semibold text-white text-xl bg-blue-500 rounded-full px-4 py-1 my-5 hover:scale-105 hover:bg-blue-700'>
                        Submit</button>
                </div></div>
        </div>
    )
}

export default ProgessPagesForm