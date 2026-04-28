import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { connectDb } from './Connection/connection.js';
import authRouter from './Routes/authRoute.js';
import cors from "cors";
import PostRouter from './Routes/eventRoute.js';
import "./util/statusJob.js"
dotenv.config();
const server = express();
const PORT = process.env.PORT

server.use(cors({
    origin:['http://localhost:5173','http://localhost:5174'],
    credentials:true,
}));

server.use(express.json());
server.use(cookieParser());

server.use("/auth",authRouter);
server.use("/post",PostRouter);


server.listen(PORT,()=>{
    console.log(`Server is Running in http://localhost:${PORT}`)
    connectDb();
})