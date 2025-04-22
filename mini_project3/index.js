import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const app=express();

const PORT=3000;
app.use(express.json());
connectDB();

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});