import React from 'react'

const ProfileCard = ({ EditOn, user }) => {
    if (!user) {
        return (
            <div className="bg-white p-5 rounded-xl shadow-md text-center">
                <p className="text-gray-500 font-semibold">Loading profile...</p>
            </div>
        );
    }


    return (
        <div className='flex flex-row gap-2 bg-[rgba(255,255,255,0.7)] p-5 rounded-3xl items-center shadow-2xl my-5'>
            <div className='h-52 w-52 rounded-full aspect-square'>
                <img className='h-full w-full object-cover rounded-full' src={user.profile_url || 'https://via.placeholder.com/150'} alt='avatar'></img>
            </div>
            <div className='p-4'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold font-serif m-0'>{user.username}</h1>
                    <button onClick={EditOn} style={{ boxShadow: "2px 2px 8px black" }} className='text-lg font-bold bg-blue-500 text-white px-6 py-1 rounded-3xl hover:scale-105 hover:bg-blue-700 hover:cursor-pointer hover:shadow-none'>Edit</button>
                </div>
                <p>{user.place}</p>
                <h3 className='italic text-lg my-5'>{user.bio}</h3>
                <p className='font-semibold text-md'>Favorite Genre   <span className='font-normal'>{user.fav_genre}</span></p>
                <p className='font-semibold text-md'>Favorite Author  <span className='font-normal'>{user.fav_author}</span></p>
            </div>
        </div>
    )
}

export default ProfileCard