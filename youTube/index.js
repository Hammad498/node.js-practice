import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.routes.js";


dotenv.config();


const app=express();



app.get("/",(req,res)=>{
    res.send("Home!")
})

app.use("/api/v1/users",userRoute);

connectDB().then(() => {
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on:${process.env.PORT}`)
    })
})
