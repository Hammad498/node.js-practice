import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app=express();

connectDB();

app.get("/",(req,res)=>{
    res.send('working!')
})


app.listen(3000,()=>{
    console.log('server is successfully running!')
})