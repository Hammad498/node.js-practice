import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';

dotenv.config();

const app=express();

connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/v1",UserRouter)

app.get("/",(req,res)=>{
    res.send('working!')
})


app.listen(3000,()=>{
    console.log('server is successfully running!')
})