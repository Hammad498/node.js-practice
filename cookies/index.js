import express from "express";

const app=express();
const PORT=4000

app.get("/",(req,res)=>{
    res.cookie("name","express",{
        maxAge:1000*60*60*24,
    });
    res.send("hello");
})


app.get('/products',(req,res)=>{
    res.status(200).send({
        id:1,
        name:"tel",
        price:4000
    })
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})