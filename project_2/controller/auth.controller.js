

///1.login controller

export const Login=(req,res)=>{
    const {username}=req.body;

    if(!username){
        res.status(400).send(`Fields required!`)
    }

    //store in session
    req.session.user={username};

    //for client side ---> show/save user
    res.cookie("username",username,{
        maxAge:1000*60*60*24,
        httpOnly:true
    });

    res.json({
        message:"Login Successfull",
        username
    })

}


export const Logout=(req,res)=>{


    ///for logout flirst clear the cookies

    res.clearCookie('username');
    res.session.destroy((err)=>{
        if(err){
            res.status(500).json({
                message:"Error logging out!"
            })
        }
        res.json({
            message:"loged out!"
        })
    });
}