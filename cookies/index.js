import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

// 2. cookie-parser as middleware
const app = express();


//4.sessions--> as middleware , configuration
app.use(session({
    secret:"mysecret",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60*24,
    }
}));


app.use(cookieParser("node.js"));

//3.signed cookie
// app.use(cookieParser("secret"));
const PORT = 4000;

app.get("/", (req, res) => {
    // 1. cookies set and expire
    // res.cookie("name", "express", {
    //     maxAge: 1000 * 60 * 60 * 24,
    //     signed:true,
    // });


    console.log(req.session);
    console.log(req.session.id);
    res.send("hello");
});

// app.get('/products', (req, res) => {
//     // Corrected from req.cookie to req.cookies
//     if (req.cookies.name && req.cookies.name === 'express') {
//         console.log(req.cookies);
//         console.log(req.signedCookies);


//         res.status(200).send({
//             id: 1,
//             name: "tel",
//             price: 4000
//         });
//     } else {
//         res.status(404).send(`you are not authorized!`);
//     }
// });


//5.session  ----> append user
app.get("/login",(req,res)=>{
    req.session.user={
        id:1,
        name:"john",
        age:7
    }

    res.send('user loged in!',req.session.user.name);
})

//6.req.session.destroy()                e.g: loged out and cookie also deleted

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});