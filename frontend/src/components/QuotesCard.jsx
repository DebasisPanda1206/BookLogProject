import React from 'react'

const QuotesCard = ({ message, author, picURL }) => {
    return (
        <div className="flex flex-col justify-between bg-[rgba(255,255,255,0.7)] rounded-2xl my-20 p-10 shadow-2xl h-80 ">
            <h2 className="text-xl font-serif italic text-center font-semibold">{message}</h2>

            <div className="w-full text-right mt-4">
                <p>~ {author}</p>
            </div>

            <div className="mt-auto flex justify-center">
                <img
                    src={picURL}
                    alt={author}
                    className="h-20 w-20 object-cover rounded-full"
                />
            </div>
        </div>
    )
}

export default QuotesCard