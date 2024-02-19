import mongoose from "mongoose";


const onlineSchema=mongoose.Schema(

    {
        username: {
            type: String,
            trim: true,
            required:true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        photo: {
            type:String,
            required:true
        },
        status:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps:true
    }
)


const Online =mongoose.model("Online", onlineSchema);

export default Online;