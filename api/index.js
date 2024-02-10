import express from 'express';
import 'dotenv/config';
import dbConnect from './config/dbconnection.js';


dbConnect();
const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})