import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const ProfileEditForm = ({ EditClose, refreshProfileData }) => {
    const [username, set_username] = useState("");
    const [location, set_location] = useState("");
    const [fav_genre, set_favGenre] = useState("");
    const [fav_author, set_favAuthor] = useState("");
    const [bio, set_Bio] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicUrl, set_profilePicUrl] = useState(null)

    const handle_img_fileChange = (e) => {
        setProfilePic(e.target.files[0]);
    }

    useEffect(() => {
        if (profilePic) {
            const objURL = URL.createObjectURL(profilePic);
            set_profilePicUrl(objURL);
            return () => URL.revokeObjectURL(objURL);
        }

    }, [profilePic])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('profilePic', profilePic);
        formData.append('username', username);
        formData.append('place', location);
        formData.append('fav_genre', fav_genre);
        formData.append('fav_author', fav_author);
        formData.append('bio', bio);

        try {
            const res = await axios.put('http://localhost:5000/api/profile/update', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(res.data.message);
            // Optionally show success toast or reload profile
            toast.success(res.data.message)
            refreshProfileData()
            EditClose()

        } catch (err) {
            console.error('Profile update failed:', err);
            toast.error(err.response?.data?.error || "Profile update failed.")

        }
    }

    return (
        <div className='fixed inset-0 bg-transparent  backdrop-blur-sm z-10 flex justify-center items-center'>
            <div style={{ boxShadow: "5px 5px 15px black" }} className='bg-amber-100 w-[50%] p-8 relative'>
                <button className='text-3xl absolute right-2.5 top-1' onClick={EditClose}>×</button>
                <h1 className='text-2xl'>Edit Your Profile</h1>

                <form className='flex flex-col p-2.5 gap-2.5' autoComplete='on' encType='multipart/form-data' onSubmit={handleSubmit}>
                    <div className='my-4 flex justify-start items-baseline gap-5'>
                        <div><img className='h-24 w-24 rounded-full object-cover' src={profilePicUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} /></div>
                        <div><label className='px-3 py-1.5 bg-black text-white rounded-full hover:cursor-pointer' htmlFor='profilePic'>
                            <input className='hidden' type='file' id='profilePic' accept='image/*' onChange={handle_img_fileChange} />
                            Upload
                        </label></div>

                    </div>
                    <input value={username} onChange={(e) => set_username(e.target.value)} className='bg-white px-2.5 py-1 rounded-xl' type="text" id='username' placeholder='Enter Name' />
                    <input value={location} onChange={(e) => set_location(e.target.value)} className='bg-white px-2.5 py-1 rounded-xl' type='text' id='location' placeholder='Enter your location' />
                    <input value={fav_genre} onChange={(e) => set_favGenre(e.target.value)} className='bg-white px-2.5 py-1 rounded-xl' type="text" id='fav_genre' placeholder='Your favorite genre' />
                    <input value={fav_author} onChange={(e) => set_favAuthor(e.target.value)} className='bg-white px-2.5 py-1 rounded-xl' type='text' id='fav_author' placeholder='Your favourite author' />
                    <textarea value={bio} onChange={(e) => set_Bio(e.target.value)} className='bg-white px-2.5 py-1 rounded-2xl' cols={4} rows={3} placeholder='Enter your bio' />

                    <button className='py-2 w-fit px-4 rounded-full bg-blue-500 text-lg text-white font-semibold hover:scale-105 hover:bg-blue-700' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileEditForm