import React from 'react'

const ProgressCard = ({ progress }) => {
    return (
        <div className='w-full p-2 flex items-center gap-2'>
            <div className='h-2.5 bg-white flex-1 rounded-full'>
                <div style={{ width: `${progress}%` }} className='h-full bg-green-600 rounded-full transition-all duration-500'></div>
            </div>
            <p>{Math.round(progress)}%</p>
        </div>
    )
}

export default ProgressCard