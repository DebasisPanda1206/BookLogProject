import React from 'react'

const Footer = () => {
    return (
        <div className='bg-orange-700 py-5 flex flex-col items-center'>
            <h1 className='text-white text-xl font-serif font-normal tracking-wide py-2'>BookStack</h1>
            <div className='flex flex-row gap-4'>
                <a href='#'><img className='h-8 w-8 hover:scale-110' src='https://img.icons8.com/?size=100&id=8808&format=png&color=FFFFFF'></img></a>
                <a href='#'><img className='h-8 w-8 hover:scale-110' src='https://img.icons8.com/?size=100&id=85154&format=png&color=FFFFFF'></img></a>
                <a href='#'><img className='h-8 w-8 hover:scale-110' src='https://img.icons8.com/?size=100&id=118467&format=png&color=FFFFFF'></img></a>
                <a href='#'><img className='h-8 w-8 hover:scale-110' src='https://img.icons8.com/?size=100&id=YfCbGWCWcuar&format=png&color=FFFFFF'></img></a>
            </div>
            <div className='text-gray-300 text-sm my-2.5'>Copyright@2025</div>
        </div>
    )
}

export default Footer