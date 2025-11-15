import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='bg-orange-700 px-6 flex justify-between items-center'>
            <div>
                <h1 className='text-white text-4xl font-serif font-normal tracking-wide py-2'>BookStack</h1>
            </div>
            <ul className='flex gap-5'>
                <li className='text-orange-100 hover:scale-105 hover:text-white hover:font-bold transition duration-100 '><Link to="/">Home</Link></li>
                <li className='text-orange-100 hover:scale-105 hover:text-white hover:font-bold transition duration-100 '><Link to="/search">Search</Link></li>
                <li className='text-orange-100 hover:scale-105 hover:text-white hover:font-bold transition duration-100' ><Link to="/review">Review</Link></li>
                <li className='text-orange-100 hover:scale-105 hover:text-white hover:font-bold transition duration-100'><Link to="/profile">Profile</Link></li>
            </ul>
        </div>
    )
}

export default Navbar