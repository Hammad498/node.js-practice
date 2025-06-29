import mongoose from "mongoose";
import {Schema} from 'mongoose';


const blacklistSchema=new Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:() => Date.now(),
        expires:86400
    }
},{timestamps:true});

const blacklistModel=mongoose.model('blacklist',blacklistSchema);

export default blacklistModel;
