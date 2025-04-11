import exprress from 'express';
import router from './router/route.middleware.js';

const app=exprress();


app.use("/api/v1",router);

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})
