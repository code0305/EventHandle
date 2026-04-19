import jwt from 'jsonwebtoken';
import { User } from '../model/User.js';

export const authUser = async (req,res,next) => {
    try {
        // const token = req.header("auth-token")
        const token = req.cookies.mycookie;
        if(!token)
        {
            return res.status(400).json({success:false,message:"Token Not Found"});
        }
        const decode = jwt.verify(token,process.env.SECRET_KEY); // get payload
        if(!decode)
        {
            return res.status(400).json({success:false,message:"No Token Exist"});
        }
        const user = await User.findById(decode.id).select("-password");
        if(!user)
        {
            return res.status(400).json({success:false,message:"User Doesn't Exist"});
        }
        req.user=user;
        next();
    } catch (error) {
        return res.status(400).json({success:false,message:"Not Authorized"});
    }
}