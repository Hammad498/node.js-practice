import nodemailer from 'nodemailer'
import dotenv from "dotenv"

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});


const sendEmail=async()=>{
    try {
        const info=   await transporter.sendMail({
               from: '"Hammad" <hammadabrar498@gmail.com>',

               to: "baz@example.com,baz@example.com", 
               subject: "Hello testMail", 
               text: "Hello testMail123", 
               html: "<b>Hello testMail123</b>", 
           })
           console.log('Email send Successfully',info)
       } catch (error) {
           console.log('Email error',error)
       }
}

sendEmail();


  
