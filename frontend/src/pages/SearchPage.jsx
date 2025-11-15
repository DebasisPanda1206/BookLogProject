import React, { useState } from 'react';
import SearchResultCard from '../components/SearchResultCard';
import useAuth from '../utils/auth';
const SearchPage = () => {
    const token = useAuth();
    const apiKey = import.meta.env.VITE_BOOKS_API_KEY;
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    // Search Book using Google Books API
    const search_book = async () => {
        if (!query.trim()) return;
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=25&key=${apiKey}`
            );
            const data = await response.json();

            const books = data.items || [];

            const formatted = books.map((item) => {
                const volume = item.volumeInfo;
                return {
                    google_id: item.id,
                    title: volume.title || 'Unknown',
                    author: volume.authors?.join(', ') || 'Unknown',
                    cover: volume.imageLinks?.thumbnail || 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg',
                    genre: volume.categories?.slice(0, 2).join(', ') || 'Unknown',
                    pages: volume.pageCount || 'Unknown',
                    published: volume.publishedDate || 'Not mentioned',
                };
            });

            setResult(formatted);
        } catch (error) {
            console.error("Error fetching from Google Books API:", error);
            setResult([]);
        }
    };

    return (
        <div>
            {token ? (
                <div className='w-[90%] mx-auto'>
                    {/* Search Bar */}
                    <div className='flex gap-3 w-full px-15'>
                        <input
                            type='text'
                            placeholder='Search Book...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className='bg-gray-200 h-10 rounded-full p-5 flex-1'
                        />
                        <button
                            onClick={search_book}
                            className='bg-blue-500 text-white text-xl px-5 py-auto rounded-full font-semibold hover:bg-blue-700'
                        >
                            Search
                        </button>
                    </div>

                    {/* Search Result */}
                    <div className=' py-8 grid grid-cols-4 gap-5'>
                        {result.map((book, index) => (
                            <SearchResultCard
                                key={index}
                                title={book.title}
                                author={book.author}
                                cover={book.cover}
                                genre={book.genre}
                                pages={book.pages}
                                published={book.published}
                                google_id={book.google_id}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <p className="bg-[rgba(0,0,0,0.6)] text-white text-xl font-semibold px-6 py-4 rounded-xl shadow-md text-center">
                        Login to BookStack to see Search components
                    </p>
                </div>
            )}</div>
    );
};

export default SearchPage;