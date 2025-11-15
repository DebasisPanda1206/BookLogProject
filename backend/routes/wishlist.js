import pool from "../db/index.js";
import { verifyToken } from "../middleware/authoriseJWT.js";
import express from 'express'

const router = express.Router();

router.post('/add', verifyToken, async (req, res) => {
    const { google_id, title, author, cover_url, genre, pages, published } = req.body;
    const user_id = req.user.uid;

    try {
        // Check if book exists
        let book = await pool.query('SELECT book_id FROM books WHERE google_id = $1', [google_id]);

        let book_id;
        if (book.rows.length === 0) {
            const insert = await pool.query(
                `INSERT INTO books (google_id, title, author, cover_url, genre, pages, published)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING book_id`,
                [google_id, title, author, cover_url, genre, pages, published]
            );
            book_id = insert.rows[0].book_id;
        } else {
            book_id = book.rows[0].book_id;
        }

        // Check if already in wishlist
        const exists = await pool.query(
            'SELECT * FROM wishlist WHERE user_id = $1 AND book_id = $2',
            [user_id, book_id]
        );
        if (exists.rows.length > 0) {
            return res.status(409).json({ error: 'Book already in wishlist' });
        }

        // Add to wishlist
        await pool.query(
            'INSERT INTO wishlist (user_id, book_id) VALUES ($1, $2)',
            [user_id, book_id]
        );

        res.json({ message: 'Book added to wishlist' });
    } catch (err) {
        console.error('Wishlist error:', err);
        res.status(500).json({ error: 'Failed to add book' });
    }
});

router.get('/', verifyToken, async (req, res) => {
    const user_id = req.user.uid;
    try {
        const result = await pool.query(
            `SELECT b.* FROM wishlist w
       JOIN books b ON w.book_id = b.book_id
       WHERE w.user_id = $1`,
            [user_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Fetch wishlist error:', err);
        res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
});

router.delete('/remove', verifyToken, async (req, res) => {
    const { google_id } = req.body;
    const user_id = req.user.uid;

    try {
        const book = await pool.query('SELECT book_id FROM books WHERE google_id = $1', [google_id]);
        if (book.rows.length === 0) return res.status(404).json({ error: 'Book not found' });

        const book_id = book.rows[0].book_id;

        await pool.query('DELETE FROM wishlist WHERE user_id = $1 AND book_id = $2', [user_id, book_id]);

        res.json({ message: 'Book removed from wishlist' });
    } catch (err) {
        console.error('Remove wishlist error:', err);
        res.status(500).json({ error: 'Failed to remove book from wishlist' });
    }
});


export default router