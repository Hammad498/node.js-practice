import {Schema,Model} from "mongoose";


const userSchema=new Schema({
    _id:{
        type:Number,
        required:true
    },
    channelName:{
        type:String,
    },
    phone:{
        type:Number,
    },
    password:{
        type:Number,
        required:true
    },
    // logo:{

    // },
    // subscribers:{

    // },
    // subscribed:{

    // },
    // channels:{

    // }
},{timestamp:true});


const User=new Model("user",userSchema);


export default User;