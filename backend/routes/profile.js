import express from 'express';
import cloudinary from '../configurations/cloudinary.js';
import { verifyToken } from '../middleware/authoriseJWT.js';
import { upload } from '../middleware/upload.js';
import pool from '../db/index.js' // ✅ PostgreSQL pool

const router = express.Router();

router.put('/update', verifyToken, upload.single('profilePic'), async (req, res) => {
    const { username, place, fav_genre, fav_author, bio } = req.body;
    let profilePic_url = null;
    console.log('Incoming body:', req.body);
    console.log('User ID:', req.user?.uid);
    console.log('File:', req.file);

    try {
        // ✅ If image is uploaded, send to Cloudinary
        if (req.file) {
            const streamUpload = (buffer) => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: 'Bookstack/profilePics' },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    ).end(buffer);
                });
            };
            const result = await streamUpload(req.file.buffer);
            console.log('Cloudinary result:', result);

            profilePic_url = result.secure_url;
        }

        // ✅ Update PostgreSQL with or without image
        try {
            await pool.query(`UPDATE users SET username = $1, place = $2, fav_genre = $3, fav_author = $4, bio = $5, profile_url = COALESCE($6, profile_url) WHERE uid = $7`,
                [username, place, fav_genre, fav_author, bio, profilePic_url, req.user.uid]
            );
        } catch (sqlErr) {
            console.error('SQL error:', sqlErr);
            return res.status(500).json({ error: 'Database update failed' });
        }

        res.json({ message: 'Profile updated successfully', profilePic_url });
    } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).json({ error: 'Server error during profile update' });
    }
});

router.get('/me', verifyToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT username, bio, profile_url, place, fav_genre, fav_author FROM users WHERE uid = $1',
            [req.user.uid]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Profile fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

export default router;