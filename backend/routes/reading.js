import express from 'express';
import pool from '../db/index.js';
import { verifyToken } from '../middleware/authoriseJWT.js';

const router = express.Router();

// Add to currently reading
router.post('/add', verifyToken, async (req, res) => {
    const { google_id, title, author, cover_url, genre, pages } = req.body;
    const user_id = req.user.uid;

    try {
        let book = await pool.query('SELECT book_id FROM books WHERE google_id = $1', [google_id]);
        let book_id;

        if (book.rows.length === 0) {
            const insert = await pool.query(
                `INSERT INTO books (google_id, title, author, cover_url, genre, pages)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING book_id`,
                [google_id, title, author, cover_url, genre, pages]
            );
            book_id = insert.rows[0].book_id;
        } else {
            book_id = book.rows[0].book_id;
        }

        await pool.query(
            `INSERT INTO reading_status (user_id, book_id, pages_completed)
       VALUES ($1, $2, $3) ON CONFLICT (user_id, book_id) DO NOTHING`,
            [user_id, book_id, 0]
        );

        res.json({ message: 'Book added to currently reading' });
    } catch (err) {
        console.error('Add to reading error:', err);
        res.status(500).json({ error: 'Failed to add book to currently reading' });
    }
});

// Update progress
router.patch('/progress', verifyToken, async (req, res) => {
    const { google_id, pages_completed } = req.body;
    const user_id = req.user.uid;

    try {
        const book = await pool.query('SELECT book_id FROM books WHERE google_id = $1', [google_id]);
        if (book.rows.length === 0) return res.status(404).json({ error: 'Book not found' });

        const book_id = book.rows[0].book_id;

        await pool.query(
            `UPDATE reading_status
       SET pages_completed = $1
       WHERE user_id = $2 AND book_id = $3 AND status = 'reading'`,
            [pages_completed, user_id, book_id]
        );

        res.json({ message: 'Progress updated' });
    } catch (err) {
        console.error('Progress update error:', err);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// Mark as complete
router.patch('/complete', verifyToken, async (req, res) => {
    const { google_id } = req.body;
    const user_id = req.user.uid;

    console.log("Received complete request for:", google_id, "by user:", user_id);

    try {
        const book = await pool.query('SELECT book_id FROM books WHERE google_id = $1', [google_id]);
        if (book.rows.length === 0) {
            console.log("Book not found");
            return res.status(404).json({ error: 'Book not found' });
        }

        const book_id = book.rows[0].book_id;

        const update = await pool.query(
            `UPDATE reading_status
       SET status = 'completed', completed_at = CURRENT_TIMESTAMP
       WHERE user_id = $1 AND book_id = $2`,
            [user_id, book_id]
        );

        console.log("Update result:", update.rowCount);

        res.json({ message: 'Book marked as completed' });
    } catch (err) {
        console.error('Mark complete error:', err);
        res.status(500).json({ error: 'Failed to mark book as completed' });
    }
});

// Get currently reading books
router.get('/current', verifyToken, async (req, res) => {
    const user_id = req.user.uid;

    try {
        const result = await pool.query(
            `SELECT b.title, b.author, b.cover_url, b.pages AS total_pages, r.pages_completed, b.google_id
       FROM reading_status r
       JOIN books b ON r.book_id = b.book_id
       WHERE r.user_id = $1 AND r.status = 'reading'`,
            [user_id]
        );

        res.json(result.rows);
    } catch (err) {
        console.error('Fetch currently reading error:', err);
        res.status(500).json({ error: 'Failed to fetch currently reading books' });
    }
});

// Get completed books
router.get('/completed', verifyToken, async (req, res) => {
    const user_id = req.user.uid;

    try {
        const result = await pool.query(
            `SELECT 
         b.title, b.author, b.cover_url, b.pages, b.genre, b.google_id, r.completed_at,
         EXISTS (
           SELECT 1 FROM reviews rv 
           WHERE rv.user_id = $1 AND rv.book_id = b.book_id
         ) AS reviewed
       FROM reading_status r
       JOIN books b ON r.book_id = b.book_id
       WHERE r.user_id = $1 AND r.status = 'completed'`,
            [user_id]
        );

        res.json(result.rows);
    } catch (err) {
        console.error('Fetch completed books error:', err);
        res.status(500).json({ error: 'Failed to fetch completed books' });
    }
});
export default router;