import express from 'express';
import pool from '../db/index.js';
import { verifyToken } from '../middleware/authoriseJWT.js';

const router = express.Router();


router.post('/add', verifyToken, async (req, res) => {
    console.log("📩 Received POST /api/reviews/add");
    const { google_id, rating, review_text } = req.body;
    console.log("📚 Looking for book with google_id:", google_id);
    const user_id = req.user.uid;

    try {
        const book = await pool.query('SELECT book_id FROM books WHERE google_id = $1', [google_id]);
        if (book.rows.length === 0) return res.status(404).json({ error: 'Book not found' });

        const book_id = book.rows[0].book_id;

        await pool.query(
            `INSERT INTO reviews (user_id, book_id, rating, review_text)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, book_id) DO UPDATE SET rating = $3, review_text = $4, reviewed_at = CURRENT_TIMESTAMP`,
            [user_id, book_id, rating, review_text]
        );

        res.json({ message: 'Review submitted successfully' });
    } catch (err) {
        console.error('Review submission error:', err);
        res.status(500).json({ error: 'Failed to submit review' });
    }
});

router.get('/test', (req, res) => {
    res.send('Review route is working');
});

router.get('/user', verifyToken, async (req, res) => {
    const user_id = req.user.uid;

    try {
        const result = await pool.query(
            `SELECT 
         b.title, b.author, b.cover_url, b.genre, b.google_id,
         r.rating, r.review_text, TO_CHAR(r.reviewed_at, 'DD Mon YYYY') AS reviewed_on
       FROM reviews r
       JOIN books b ON r.book_id = b.book_id
       WHERE r.user_id = $1
       ORDER BY r.reviewed_at DESC`,
            [user_id]
        );

        res.json(result.rows.map(row => ({
            name: row.title,
            author: row.author,
            coverUrl: row.cover_url,
            genre: row.genre,
            rating: row.rating,
            bookReview: row.review_text,
            reviewedOn: row.reviewed_on,
            google_id: row.google_id
        })));
    } catch (err) {
        console.error('Fetch user reviews error:', err);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

export default router;