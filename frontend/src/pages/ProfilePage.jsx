import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import ProgressCard from '../components/ProgressCard';
import { wishlist, books_completed } from '../assets/sampleData';
import WishlistCard from '../components/WishlistCard';
import BooksCompletedCard from '../components/BooksCompletedCard';
import ProfileEditForm from '../components/ProfileEditForm';
import ReviewForm from '../components/ReviewForm';
import ProgessPagesForm from '../components/ProgessPagesForm';
import useAuth from '../utils/auth';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const token = useAuth();
    const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
    const [wishlistPresent, set_wishlist] = useState(true);
    const [wishlistData, setWishlistData] = useState([]);
    const [booksCompletedPresent, set_booksCompleted] = useState(true);
    const [profileEditOn, set_profileEditOn] = useState(false);
    const [bookReviewEditOn, set_bookReviewEdit] = useState(false);
    const [bookDetails, set_bookDetails] = useState({});
    const [addProgressBook, set_AddProgressBook] = useState(null);
    const [profileData, set_profileData] = useState(null);
    const [completedBooks, setCompletedBooks] = useState([]);


    async function fetchProfile() {
        try {
            const res = await fetch('http://localhost:5000/api/profile/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            set_profileData(data);
        } catch (err) {
            console.error('Failed to fetch profile:', err);
        }
    }

    async function fetchWishlist() {
        try {
            const res = await fetch('http://localhost:5000/api/wishlist', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            set_wishlist(data.length > 0);
            setWishlistData(data); // new state to hold actual wishlist
        } catch (err) {
            console.error('Failed to fetch wishlist:', err);
        }
    }
    async function fetchCurrentlyReading() {
        try {
            const res = await fetch('http://localhost:5000/api/reading/current', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            setCurrentlyReadingBooks(data);
        } catch (err) {
            console.error('Failed to fetch currently reading books:', err);
        }
    }

    async function handleMarkComplete(google_id) {
        console.log("Marking complete for:", google_id);
        try {
            await fetch('http://localhost:5000/api/reading/complete', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ google_id })
            });

            toast.success("Book marked as completed");
            fetchCurrentlyReading(); // ✅ refresh
            fetchCompletedBooks();
            // Optionally fetch completed books too
        } catch (err) {
            toast.error("Failed to mark complete");
            console.error(err);
        }
    }

    async function fetchCompletedBooks() {
        try {
            const res = await fetch('http://localhost:5000/api/reading/completed', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            set_booksCompleted(data.length > 0);
            setCompletedBooks(data);
        } catch (err) {
            console.error('Failed to fetch completed books:', err);
        }
    }

    useEffect(() => {
        fetchProfile();
        fetchWishlist();
        fetchCurrentlyReading();
        fetchCompletedBooks();
    }, []);


    return (
        <div>
            {token ? (
                <div className='w-5/6 mx-auto'>
                    {/*Profile Card Section*/}
                    <ProfileCard EditOn={() => set_profileEditOn(true)} user={profileData} />

                    {/**Profile Edit Form appears when Edit button is clicked */}
                    {profileEditOn && <ProfileEditForm EditClose={() => set_profileEditOn(false)} refreshProfileData={fetchProfile} />}

                    {/*Currently Reading Section*/}
                    <div className='py-5'>
                        <h1 style={{ fontFamily: "Noto Serif Display,serif", textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }} className='font-serif text-4xl font-bold text-white'>Currently Reading</h1>
                        {currentlyReadingBooks.length > 0 ? (
                            currentlyReadingBooks.map((book, index) => {
                                const percent = (book.pages_completed / book.total_pages) * 100;

                                return (
                                    <div key={index} className='flex bg-[rgba(255,255,255,0.7)] rounded-2xl p-4 my-5'>
                                        <div><img className='h-56 w-40 object-cover' src={book.cover_url} alt={book.title} /></div>
                                        <div className='flex-1 p-5 relative'>
                                            <h1 className='text-4xl'>{book.title}</h1>
                                            <h3>by <span className='italic font-bold'>{book.author}</span></h3>
                                            <ProgressCard progress={percent} />
                                            <div className='flex justify-end gap-3 absolute bottom-1 right-1'>
                                                <button
                                                    onClick={() => set_AddProgressBook({ ...book })}
                                                    className='rounded-full px-3.5 py-2 text-lg font-semibold bg-gray-200 hover:bg-white hover:scale-105 hover:cursor-pointer'>
                                                    Add Progress
                                                </button>
                                                <button
                                                    onClick={() => handleMarkComplete(book.google_id)}
                                                    className='rounded-full text-lg text-white font-semibold px-3.5 py-2 bg-blue-500 hover:bg-blue-700 hover:scale-105 hover:cursor-pointer'>
                                                    Mark Complete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className='flex bg-[rgba(255,255,255,0.7)] rounded-2xl p-4 my-5'>
                                <div className='h-56 w-40 bg-gray-400 flex justify-center items-center text-white font-extrabold text-5xl'>+</div>
                                <div className='flex-1 p-5'>
                                    <h1 className='text-2xl'>Currently you're not reading any book. Start by adding a book now</h1>
                                </div>
                            </div>
                        )}
                    </div>

                    {addProgressBook && (
                        <ProgessPagesForm
                            CloseEntryPages={() => set_AddProgressBook(null)}
                            title={addProgressBook.title}
                            pages_completed={addProgressBook.pages_completed}
                            total_pages={addProgressBook.total_pages}
                            google_id={addProgressBook.google_id}
                            refreshReading={fetchCurrentlyReading}
                        />
                    )}

                    {/*WishList*/}
                    <div className='py-5'>
                        <h1 style={{ fontFamily: "Noto Serif Display,serif", textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }} className='font-serif text-4xl font-bold text-white'>Wishlist</h1>
                        {wishlistPresent ? (
                            <div className='grid grid-cols-2 gap-4 my-5'>
                                {wishlistData.map((item, index) => (
                                    <WishlistCard key={index} name={item.title} author={item.author} cover={item.cover_url} genre={item.genre} t_pages={item.pages} google_id={item.google_id} refreshWishlist={fetchWishlist} />
                                ))}
                            </div>) :
                            (
                                <div className='my-5 bg-[rgba(255,255,255,0.7)] rounded-2xl p-4'>You don't have any books in your wish list. Go the search section and add your book now.</div>
                            )}
                    </div>

                    {/**Books Completed Section */}
                    <div className='py-5'>
                        <h1 style={{ fontFamily: "Noto Serif Display,serif", textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }} className='font-serif text-4xl font-bold text-white'>Completed Books</h1>
                        {booksCompletedPresent ? (
                            <div className='my-5 grid grid-cols-4 gap-5'>
                                {completedBooks.map((item, index) => (
                                    <BooksCompletedCard
                                        key={index}
                                        name={item.title}
                                        author={item.author}
                                        cover={item.cover_url}
                                        genre={item.genre}
                                        t_pages={item.pages}
                                        reviewed={item.reviewed} // ✅ passed from backend
                                        ReviewEditOn={() => {
                                            set_bookDetails({
                                                title: item.title,
                                                author: item.author,
                                                coverURL: item.cover_url,
                                                google_id: item.google_id,
                                                b_id: index
                                            });
                                            set_bookReviewEdit(true);
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className='my-5 bg-[rgba(255,255,255,0.7)] rounded-2xl p-4'>
                                You have not completed reading any books. Go and add books from search section to read now
                            </div>
                        )}
                    </div>

                    {/**Book review form arrives when review button is clicked */}
                    {bookReviewEditOn && <ReviewForm title={bookDetails.title} author={bookDetails.author} coverURL={bookDetails.coverURL} bookId={bookDetails.b_id} google_id={bookDetails.google_id} EditClose={() => set_bookReviewEdit(false)} refreshPage={fetchCompletedBooks} />}
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <p className="bg-[rgba(0,0,0,0.6)] text-white text-xl font-semibold px-6 py-4 rounded-xl shadow-md text-center">
                        Login to BookStack to see Profile Sections
                    </p>
                </div>
            )}
        </div>
    )
}

export default ProfilePage