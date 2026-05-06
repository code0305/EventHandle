import mongoose from "mongoose";

const feebackFormSchema = new mongoose.Schema({
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
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
// only for one person
feebackFormSchema.index(
  { eventId: 1, userId: 1 },
  { unique: true }
);
export const Form = mongoose.model("Form",feebackFormSchema);