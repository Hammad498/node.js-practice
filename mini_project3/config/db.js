import mongoose from "mongoose";


const connectDB=async()=>{
    try {
        const conn=await mongoose.connect("mongodb+srv://hammadabrar498:123hammad321@cluster0.r6f1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`Mongodb connected :${conn.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}


export default connectDB;