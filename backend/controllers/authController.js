import pool from '../db/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        await pool.query(
            "INSERT INTO users (username,email,hashed_password) VALUES ($1,$2,$3)", [username, email, hashed]
        );
        res.status(201).json({ message: 'User registered successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log("Login attempt:", username, password);

        const result = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
        const user = result.rows[0];
        console.log("User from DB:", user);

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        const match = await bcrypt.compare(password, user.hashed_password);
        console.log("Password match:", match);

        if (!match) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET, { expiresIn: '180d' });
        res.json({ token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: err.message });
    }
};
