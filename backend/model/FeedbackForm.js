import mongoose from "mongoose";

const feebackFormSchema = new mongoose.Schema({
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
    },
    questions:[{
        questionId:{
            type:String,
            required:true
        },
        question:String,
        type:{
        type:String,
        enum: ["text", "multiline", "rating"],
        required: true
        }
    }
    ]
},{timestamps:true});

export const Form = mongoose.model("Form",feebackFormSchema);