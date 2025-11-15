import React, { useState } from 'react'
import QuotesCard from '../components/QuotesCard'
import LoginForm from '../components/LoginForm'
import RegistrationForm from '../components/RegistrationForm'


const Homepage = () => {
    let quote = [
        { message: "“A reader lives a thousand lives before he dies.”", author: "George R.R.Martin", url: "https://www.hollywoodreporter.com/wp-content/uploads/2024/02/GettyImages-1472023147-H-2024.jpg?w=1296&h=730&crop=1" },
        { message: "“Until I feared I would lose it, I never loved to read. One does not love breathing.”", author: "Harper Lee", url: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-50358657.jpg" },
        { message: "“Reading is essential for those who seek to rise above the ordinary.”", author: "Jim Rohn", url: "https://m.media-amazon.com/images/I/41CVkZuDlVL._UF894,1000_QL80_.jpg" }
    ]
    const [loginPageOn, set_loginPageOn] = useState(false);
    const [registrationPageOn, set_registrationPageON] = useState(false);
    return (
        <div className='p-15 mt-10'>
            <h1 style={{ fontFamily: "Noto Serif Display,serif" }} className=' text-white text-6xl font-bold my-3'>Track Your Reading</h1>
            <h1 style={{ fontFamily: "Noto Serif Display,serif" }} className=' text-white text-6xl my-3'>Build Your Bookshelf !</h1>
            <p className='text-white text-3xl mb-10 '>Log books, write your reviews, and
                reach your goal</p>

            <div className='flex gap-5'><button onClick={() => set_loginPageOn(true)}
                className='text-white text-2xl bg-blue-500 px-8 py-2 rounded-full font-bold my-10 hover:scale-105 hover:bg-blue-700 transition duration-150'>
                LogIn</button>

                {loginPageOn && <LoginForm LoginFormClose={() => set_loginPageOn(false)} />}

                <button onClick={() => set_registrationPageON(true)}
                    className='text-black text-2xl bg-white px-8 py-2 rounded-full font-bold my-10 hover:scale-105 transition duration-150'>
                    Register</button>

                {registrationPageOn && <RegistrationForm RegistrationFormClose={() => set_registrationPageON(false)} />}
            </div>

            <div className='grid grid-cols-3 gap-11 quote_card_box'>
                {quote.map((item, index) => (
                    <QuotesCard
                        key={index}
                        message={item.message}
                        author={item.author}
                        picURL={item.url}
                    />
                ))}
            </div>

            <div className='my-20 grid grid-cols-3 gap-5 feature_box'>
                <div className='bg-[rgba(255,255,255,0.8)] flex flex-col p-5 rounded-xl items-center'>
                    <img className='flex-1 h-28 w-28' src='https://img.icons8.com/?size=100&id=_Gk0DsQnOUpt&format=png&color=000000'></img>
                    <p className='flex-1 text-xl'>Add titles, authors, and reading status in seconds.</p>
                </div>
                <div className='bg-[rgba(255,255,255,0.8)] flex flex-col p-5 rounded-xl items-center'>
                    <img className='flex-1 h-28 w-28' src='https://img.icons8.com/?size=100&id=463&format=png&color=000000'></img>
                    <p className='flex-1 text-xl'>Share thoughts, ratings, and personal reflections on each book.</p>
                </div>
                <div className='bg-[rgba(255,255,255,0.8)] flex flex-col p-5 rounded-xl items-center'>
                    <img className='flex-1 h-28 w-28' src='https://img.icons8.com/?size=100&id=DDznsRLRHIrF&format=png&color=000000'></img>
                    <p className='flex-1 text-xl'>Define yearly targets and celebrate reading milestones.</p>
                </div>
            </div>
        </div>
    )
}

export default Homepage