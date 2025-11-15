import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'

const RegistrationForm = ({ RegistrationFormClose }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handle_Register = async (e) => {
        e.preventDefault()
        if (!password || !username || !confirmPassword || !email) {
            toast.error("Enter all fields")
        }
        else if (password != confirmPassword) {
            toast.error("Passwords don't match")
        } else {
            try {
                await axios.post('http://localhost:5000/api/auth/register', { username, email, password })
                toast.success("User Registered!")
                RegistrationFormClose()
            } catch (err) {
                toast.error(err.response?.data?.error || "Registration Failed!")
            }
        }
    }
    return (
        <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
            <div style={{ boxShadow: "4px 4px 7px black" }} className='bg-white relative w-[45%]'>
                <button className='text-2xl hover:scale-110 absolute top-1.5 right-4' onClick={RegistrationFormClose}>×</button>
                <div className='flex flex-col justify-center items-center mt-10'>
                    <h1 className='text-4xl font-semibold'>REGISTER</h1>
                    <p className='my-2'>Please enter your username and password</p>
                    <form autoComplete='on' className='flex flex-col items-center gap-4 my-10 px-20 w-full'>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className='bg-transparent border-2 border-black rounded-full p-4 w-full' type="text" placeholder='Username' required></input>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-transparent border-2 border-black rounded-full p-4 w-full' type="text" placeholder='E-mail' required></input>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-transparent border-2 border-black rounded-full p-4 w-full' type='password' placeholder='Password' required></input>
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='bg-transparent border-2 border-black rounded-full p-4 w-full' type='password' placeholder='Re-enter Password' required></input>
                        <button onClick={handle_Register}
                            className='font-semibold text-white text-xl bg-blue-500 rounded-full px-4 py-1 my-5 hover:scale-105 hover:bg-blue-700'>
                            Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm