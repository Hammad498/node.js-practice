import { transporter } from "./Email.config.js";



export const sendVerificationEamil=async(email,verificationCode)=>{
    try {
     const response=   await transporter.sendMail({
            from: '"Hammad" <hammadabrar498@gmail.com>',

            to: email, 
            subject: "Verify your Email", 
            text: "Verify your Email", 
            html:verificationCode
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}
export const senWelcomeEmail=async(email,name)=>{
    try {
     const response=   await transporter.sendMail({
            from: '"Hammad" <hammadabrar498@gmail.com>',

            to: email, 
            subject: "Welcome Email", 
            text: "Welcome Email", 
            html:name
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}

