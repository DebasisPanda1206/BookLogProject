import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'
import profileRoutes from './routes/profile.js'
import wishlistRoutes from './routes/wishlist.js'
import readingRoutes from './routes/reading.js'
import reviewRoutes from './routes/reviews.js';

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth/', authRoutes);
app.use('/api/profile/', profileRoutes);
app.use('/api/wishlist/', wishlistRoutes);
app.use('/api/reading/', readingRoutes);
app.use('/api/reviews/', reviewRoutes)

app.listen(5000, () => console.log("app listening on port 5000"))