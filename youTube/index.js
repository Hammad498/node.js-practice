import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";


dotenv.config();


const app=express();



app.get("/",(req,res)=>{
    res.send("Home!")
})

connectDB().then(() => {
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on:${process.env.PORT}`)
    })
})
