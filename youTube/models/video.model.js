import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";


const videoSchema=new Schema({
    _id:{
        type:mongoose.Types.ObjectId,
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    videoUrl:{
        type:String,
        required:true,
        trim:true
    },
    thumbnailUrl:{
        type:String,
        required:true,
        trim:true
    },
    thumbnailId:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    tags:[{
        type:String,
        trim:true
    }],
    // likes:{
    //     type:Number,
    //     default:0,
    //     min:0
    // },
    // dislikes:{
    //     type:Number,
    //     default:0,
    //     min:0
    // },
    // views:{
    //     type:Number,
    //     default:0,
    //     min:0
    // },
    likedBy:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    dislikedBy:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    viewedBy:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],

},{timestamps:true});



videoSchema.virtual("likes").get(function(){
    return this.likedBy.length
})

videoSchema.virtual("dislikes").get(function(){
    return this.dislikedBy.length
})


videoSchema.virtual("views").get(function(){
    return this.viewedBy.length
})

videoSchema.set("toJSON",{
    virtuals:true
})






const videoModel=mongoose.model("Video",videoSchema);

export default videoModel;