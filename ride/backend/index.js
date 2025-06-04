import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", UserRouter);

app.listen(3000, () => {
    console.log('server is successfully running!');
});
