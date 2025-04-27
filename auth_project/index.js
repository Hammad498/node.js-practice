import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import session from 'express-session'
import userRoute from './routes/user.route.js';
import taskRoute from './routes/task.route.js'


dotenv.config();


const app=express();
const PORT=4000;
app.use(express.json());
app.use(
    session({
        
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{maxAge:600000}
    })
)




app.get("/",(req,res)=>{
    res.send("hello world");
})


app.use('/api/user',userRoute);
app.use('/api/task',taskRoute);


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })
})
