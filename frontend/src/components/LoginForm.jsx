import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const LoginForm = ({ LoginFormClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handle_LoginClick = async (e) => {
        e.preventDefault();
        if (username === "") {
            toast.error("Enter username");
        } else if (password === "") {
            toast.error("Enter password");
        } else {
            try {
                const res = await axios.post('http://localhost:5000/api/auth/login', { username, password }, { headers: { 'Content-Type': 'application/json' } });
                console.log("Response send:", res.data)
                if (res.data?.token) {
                    localStorage.setItem('token', res.data.token);
                    toast.success("Login successful!");
                    LoginFormClose();
                } else {
                    toast.error("No token received from server");
                }


            } catch (err) {
                console.log("Axios error:", err); // ✅ Full error object
                console.log("Error response:", err.response); // ✅ May be undefined
                const msg = err.response?.data?.error || err.response?.data?.message || "Login Failed";
                toast.error(msg);
            }

        }
    }
    return (
        <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
            <div style={{ boxShadow: "4px 4px 7px black" }} className='bg-white relative w-[45%]'>
                <button className='text-2xl hover:scale-110 absolute top-1.5 right-4' onClick={LoginFormClose}>×</button>
                <div className='flex flex-col justify-center items-center mt-10'>
                    <h1 className='text-4xl font-semibold'>LOGIN</h1>
                    <p className='my-2'>Please enter your username and password</p>
                    <form autoComplete='on' className='flex flex-col items-center gap-4 my-10 px-20 w-full'>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className='bg-transparent border-2 border-black rounded-full p-4 w-full' type="text" placeholder='Username' required></input>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-transparent border-2 border-black rounded-full p-4 w-full' type='password' placeholder='Password' required></input>
                        <button onClick={handle_LoginClick}
                            className='font-semibold text-white text-xl bg-blue-500 rounded-full px-4 py-1 my-5 hover:scale-105 hover:bg-blue-700'>
                            Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm