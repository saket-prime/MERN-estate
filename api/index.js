import express from 'express';
import 'dotenv/config';
import dbConnect from './config/dbconnection.js';
import errorHandler from './middlewares/errorHandler.js';
import userRoutes from './routes/auth.route.js';

dbConnect();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', userRoutes);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})