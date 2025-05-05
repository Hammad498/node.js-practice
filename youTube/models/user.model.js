import mongoose, {mongo, Schema} from "mongoose";


const userSchema=new Schema({
    _id:{
        type:Schema.Types.ObjectId,
    },
    channelName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    logoUrl:{
        type:String,
        required:true,

    },
    logoId:{
        type:String,
        required:true,
    },
    subscribers:{
        type:Number,
        default:0,
        required:false

    },
    subscribedChannels:[{
        type:Schema.Types.ObjectId,
        ref:"User",
    }],
    
},{timestamp:true});





const userModel=mongoose.model("User",userSchema);


export default userModel;