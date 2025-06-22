import express from 'express';
import cors from 'cors';
import Dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import { use } from 'react';
Dotenv.config();

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FROTEND_URL
}))

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
    crossOriginOpenerPolicy: false,
}
));

app.get('/', (req, res) => {
    res.json({
        message: 'Server is Running' + PORT
    });
});

app.use('/api/user', userRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Connected to MongoDB and server is running on', PORT);
    });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});