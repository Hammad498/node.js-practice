import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.routes.js";
import bodyParser from "body-parser";
import cors from "cors";

//hold for a while before uploading to cloudinary(upload complete)
import fileUpload from "express-fileupload";


dotenv.config();


const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json);
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));



app.get("/",(req,res)=>{
    res.send("Home!")
})

app.use("/api/v1/users",userRoute);

connectDB().then(() => {
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on:${process.env.PORT}`)
    })
})
