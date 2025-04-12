import express from "express";
import cookieParser from "cookie-parser";

// 2. cookie-parser as middleware
const app = express();

//3.signed cookie
app.use(cookieParser("secret"));
const PORT = 4000;

app.get("/", (req, res) => {
    // 1. cookies set and expire
    res.cookie("name", "express", {
        maxAge: 1000 * 60 * 60 * 24,
        signed:true,
    });
    res.send("hello");
});

app.get('/products', (req, res) => {
    // Corrected from req.cookie to req.cookies
    if (req.cookies.name && req.cookies.name === 'express') {
        console.log(req.cookies);
        console.log(req.signedCookies);


        res.status(200).send({
            id: 1,
            name: "tel",
            price: 4000
        });
    } else {
        res.status(404).send(`you are not authorized!`);
    }
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});