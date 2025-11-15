import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import bgImage from '../assets/BgImgLib.jpg'

const LayoutPage = () => {
    return (
        <div className='flex flex-col'>
            <Navbar />
            <main style={{ backgroundImage: `url(${bgImage})` }} className='flex-1 bg-cover bg-center bg-no-repeat bg-fixed min-h-screen'>
                <div className='p-10'>
                    <Outlet />
                </div>
            </main>
            <Footer />

        </div>
    )
}

export default LayoutPage