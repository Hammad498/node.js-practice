import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';


dotenv.config();


const app=express();
const PORT=4000;
app.use(express.json());
connectDB();



app.get("/",(req,res)=>{
    res.send("hello world");
})


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})