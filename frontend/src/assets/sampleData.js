import react from 'react'
let wishlist = [
    {
        name: "The Midnight Library",
        author: "Matt Haig",
        coverUrl: "https://m.media-amazon.com/images/I/61ZDI0txDbL._UF1000,1000_QL80_.jpg",
        totalPages: 304,
        genre: "Fantasy"
    },
    {
        name: "Educated",
        author: "Tara Westover",
        coverUrl: "https://m.media-amazon.com/images/I/71N2HZwRo3L._UF350,350_QL50_.jpg",
        totalPages: 352,
        genre: "Memoir"
    },
    {
        name: "The Silent Patient",
        author: "Alex Michaelides",
        coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782119i/40097951.jpg",
        totalPages: "Unknown",
        genre: "Thriller"
    },
    {
        name: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        coverUrl: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg",
        totalPages: 498,
        genre: "Non-fiction"
    },
    {
        name: "Circe",
        author: "Madeline Miller",
        coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565909496i/35959740.jpg",
        totalPages: 400,
        genre: "Mythological Fiction"
    }
];

let books_completed = [
    {
        name: "The Alchemist",
        author: "Paulo Coelho",
        coverURL: "https://m.media-amazon.com/images/I/71aFt4+OTOL._SY466_.jpg",
        genre: "Philosophical Fiction",
        pages: 208
    },
    {
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
        coverURL: "https://m.media-amazon.com/images/I/81gepf1eMqL.jpg",
        genre: "Classic",
        pages: 336
    },
    {
        name: "Atomic Habits",
        author: "James Clear",
        coverURL: "https://m.media-amazon.com/images/I/91bYsX41DVL._SY466_.jpg",
        genre: "Self-help",
        pages: 320
    },
    {
        name: "The Book Thief",
        author: "Markus Zusak",
        coverURL: "https://m.media-amazon.com/images/I/81eB+7+CkUL._SY466_.jpg",
        genre: "Historical Fiction",
        pages: 552
    },
    {
        name: "Norwegian Wood",
        author: "Haruki Murakami",
        coverURL: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1754402272i/11297.jpg",
        genre: "Romance",
        pages: 296
    },
    {
        name: "The Subtle Art of Not Giving a F*ck",
        author: "Mark Manson",
        coverURL: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY466_.jpg",
        genre: "Non-fiction",
        pages: "Unknown"
    },
    {
        name: "Pride and Prejudice",
        author: "Jane Austen",
        coverURL: "https://m.media-amazon.com/images/I/81OthjkJBuL._SY466_.jpg",
        genre: "Classic Romance",
        pages: 432
    }
];

const reviewed_books = [
    {
        id: 1,
        name: "The Midnight Library",
        author: "Matt Haig",
        coverUrl: "https://covers.openlibrary.org/b/id/10523345-L.jpg",
        genre: "Fantasy",
        rating: 4,
        bookReview: "A thought-provoking journey through regrets and second chances.",
        reviewedOn: "2025-10-10"
    },
    {
        id: 2,
        name: "Atomic Habits",
        author: "James Clear",
        coverUrl: "https://covers.openlibrary.org/b/id/10472235-L.jpg",
        genre: "Self-help",
        rating: 5,
        bookReview: "Practical and empowering—makes habit-building feel achievable.",
        reviewedOn: "2025-10-09"
    },
    {
        id: 3,
        name: "The Alchemist",
        author: "Paulo Coelho",
        coverUrl: "https://covers.openlibrary.org/b/id/10523346-L.jpg",
        genre: "Philosophical Fiction",
        rating: 5,
        bookReview: "A poetic tale of destiny and self-discovery that lingers long after.",
        reviewedOn: "2025-10-08"
    },
    {
        id: 4,
        name: "Educated",
        author: "Tara Westover",
        coverUrl: "https://covers.openlibrary.org/b/id/10472236-L.jpg",
        genre: "Memoir",
        rating: 4,
        bookReview: "Raw and inspiring—an unforgettable story of resilience and learning.",
        reviewedOn: "2025-10-07"
    },
    {
        id: 5,
        name: "Dune",
        author: "Frank Herbert",
        coverUrl: "https://covers.openlibrary.org/b/id/10523347-L.jpg",
        genre: "Science Fiction",
        rating: 5,
        bookReview: "Epic world-building and political intrigue—sci-fi at its finest.",
        reviewedOn: "2025-10-06"
    },
    {
        id: 6,
        name: "The Book Thief",
        author: "Markus Zusak",
        coverUrl: "https://covers.openlibrary.org/b/id/10523348-L.jpg",
        genre: "Historical Fiction",
        rating: 5,
        bookReview: "Heartbreaking and beautifully written—narrated with haunting grace.",
        reviewedOn: "2025-10-05"
    },
    {
        id: 7,
        name: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        coverUrl: "https://covers.openlibrary.org/b/id/10472237-L.jpg",
        genre: "History",
        rating: 4,
        bookReview: "A sweeping, provocative look at human evolution and society.",
        reviewedOn: "2025-10-04"
    },
    {
        id: 8,
        name: "It Ends With Us",
        author: "Colleen Hoover",
        coverUrl: "https://covers.openlibrary.org/b/id/10523349-L.jpg",
        genre: "Romance",
        rating: 3,
        bookReview: "Emotionally intense with a powerful message about love and strength.",
        reviewedOn: "2025-10-03"
    },
    {
        id: 9,
        name: "The Subtle Art of Not Giving a F*ck",
        author: "Mark Manson",
        coverUrl: "https://covers.openlibrary.org/b/id/10472238-L.jpg",
        genre: "Self-help",
        rating: 4,
        bookReview: "Bold, blunt, and refreshingly honest—challenges conventional wisdom.",
        reviewedOn: "2025-10-02"
    },
    {
        id: 10,
        name: "1984",
        author: "George Orwell",
        coverUrl: "https://covers.openlibrary.org/b/id/10523350-L.jpg",
        genre: "Dystopian",
        rating: 5,
        bookReview: "Chilling and prophetic—a masterclass in political commentary.",
        reviewedOn: "2025-10-01"
    }
];
export { wishlist, books_completed, reviewed_books };