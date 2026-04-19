import mongoose from 'mongoose'
import dotenv from 'dotenv/config';
export const connectDb = async() =>{
try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log('Successfully Connected to Database');
} catch (error) {
    console.log("Not Connected Succesfully")
}
}