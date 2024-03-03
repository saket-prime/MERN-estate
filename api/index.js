import express from 'express';
import 'dotenv/config';
import dbConnect from './config/dbconnection.js';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import listingRoutes from './routes/listing.route.js';
import cookieParser from 'cookie-parser';

dbConnect();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/listing', listingRoutes);

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})