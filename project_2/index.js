import express from "express"
import cookieParser from "cookie-parser";
import session from "express-session";

import authRoute from "./routes/auth.route.js";



const app=express();
app.use(express.json());

app.use(session({
    secret:"hello",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:100*60*60*24,
    }
}));

app.use(cookieParser("hello2"));

app.get("/",(req,res)=>{
    res.send('hello..');
})

app.use('/auth',authRoute);


app.listen(2000,()=>{
    console.log('server is running on port 2000')
})