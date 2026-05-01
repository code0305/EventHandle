import { User } from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../services/mailer.js";
import { signUpTemplate, tokenTemplate } from "../ConstantPage/constantPages.js";
import cloudinary from "../services/cloudinary.js";
import fs from "fs"
export const signin =async(req,res)=>{
    try {
    const{email,password}=req.body;
    if(!email||!password)
    {
        return res.status(400).json({success:false,message:"All Fields Are Required To Be Filled"});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({success:false,message:"Invalid Email Format"});
    }
    if(password.length<6)
    {
        return res.status(400).json({success:false,message:`${6-password.length} Character More Required For Password`});
    }

    const existingUser = await User.findOne({email:email})

    if(!existingUser)
    {
        return res.status(400).json({success:false,message:"User Does Not Exist"});
    }

    const verify = await bcrypt.compare(password,existingUser.password);
    if(!verify)
    {
        return res.status(400).json({success:false,message:"Invalid Password"});
    }
    const token = await jwt.sign({id:existingUser._id,name:existingUser.name},process.env.SECRET_KEY,{expiresIn:"7d"})
    res.cookie("mycookie",token,{httpOnly:true,secure:false,samesite:'lax',maxAge:7*24*60*60*1000})
    existingUser.lastLogin = Date.now();
    await existingUser.save();
     res.status(200).json({success:true ,message:"Sucessfully Logged In",data:existingUser});
    } catch (error) {
    console.log("Error in SignIn Function");
    return res.status(400).json({success:false,message:"Error in SignIn Function"});
    }
}

export const signup = async(req,res) =>{
    try {
    const {fullName,email,password} = req.body;
    if(!email||!fullName||!password)
    {
        return res.status(400).json({success:false, message:"All the fields are Required to be Filled"});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({success:false,message:"Invalid Email Format"});
    }
    if(password.length<6)
    {
        return res.status(400).json({success:false,message:"Password Should be at least 6 characters"});
    }

    const existingUser = await User.findOne({email});
    if(existingUser)
    {
        return res.status(400).json({success:false,message:"User Already Exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    
    const user = await User.create({
        fullName:fullName,
        email:email,
        password:hashedPassword,
    });
    await sendEmail(email,"Welcome to Meet Up",signUpTemplate({name:fullName}))
    res.status(201).json({success:true,message:"User Created"});
    } catch (error) {
    console.log("Error in Signup Function:"+error.message);
    return res.status(400).json({message:"Error in Signup Function:"+error.response.data.message});
    }  
}

export const reset = async(req,res)=>{
    try {
    const {email} = req.body;
    const user = await User.findOne({email:email});
    if(!user)
    {
        return res.status(404).json({success:false,message:"Email Does not Exist"});
    }

    const resetToken = Math.floor(10000 + Math.random() * 80000);
    const resetTokenExpire = Date.now() + 10 * 60 * 1000;;
    user.ResetToken=resetToken;
    user.ResetTokenExpire=resetTokenExpire;
    await user.save();
    await sendEmail(email,"Reset Token",tokenTemplate({ token: resetToken }));
    res.status(200).json({ success:true,message:"Reset Token Sent",identity:user._id});
    } catch (error) {
        
    console.log("Error in Reset Function");
    return res.status(400).json({success:false,message:"Error in Reset Function"});
    }  
}

export const verification = async (req,res) => {
    try {
        
        const {combinedvalue} = req.body;
        const help = req.params.help;
        const user = await User.findOne({
            _id:help,
            ResetToken:combinedvalue,
            ResetTokenExpire: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({success:false,message:"Invalid Code"});
        }
        await user.save();
        res.status(200).json({success:true,message:"Valid Code"});

    } catch (error) {
        return res.status(400).json({success:false,message:"Error in Verification Function"+error.message});
    }
}

export const UpdatePassword = async (req,res) => {
    try {
        console.log(req.body);
    const{password,confirmPassword}= req.body;
    if (!password || !confirmPassword) {
  return res.status(400).json({success: false,message: "All fields are required"});
}
    const help = req.params.help;

    const user = await User.findById(help);
    if(!user)
    {
        return res.status(400).json({success:false,message:"Invalid User"});
    }
    if(password.length<6)
    {
        return res.status(400).json({success:false,message:"Password Should be atleast 6 characters"});
    }
    if(password!==confirmPassword)
    {
        return res.status(400).json({success:false,message:"Password and Confirm Password do not match"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(password,salt);
    user.password=hashedPasword;
    user.ResetToken=undefined;
    await user.save();
    res.status(200).json({ success:true,message:"Successfully Reset Password"})
    } catch (error) {
    console.log("Error in Forget Password Function:"+error.message);
    return res.status(400).json({success:false,message:"Error in Forget Password Function: "+error.message});
    }
}

export const me = async (req,res) => {
    res.status(200).json({success:true,message:"User Details",data:req.user});
}

export const logout = async (req,res) => {
    try {
        res.clearCookie("mycookie",{httpOnly:true,secure:false,samesite:'lax'})
        res.status(200).json({success:true,message:"Successfully Logged Out"});
    } catch (error) {
        console.log("Error in Logout Function:"+error.message);
        return res.status(400).json({success:false,message:"Error in Logout Function:"+error.message});
    }
}

export const bookticket = async(req,res)=>{
    try {
        const{bookedTicket}=req.body;
        const id = req.params.id;
        const userId = req.user.id;
        if(!bookedTicket)
        {
        return res.status(401).json({success:false,message:"Missing Data"})
        }
        const existingEvent = await Event.findById(id);
        if(!existingEvent)
        {
            return res.status(400).json({success:false,message:"No such Exist"});
        }

        if(existingEvent.capacity.registered === existingEvent.capacity.totalSeats)
        {
            return res.status(400).json({success:false,message:`All Tickets Booked`})
        }
        if((existingEvent.capacity.registered + bookedTicket ) > existingEvent.capacity.totalSeats)
        {
            return res.status (400).json({success:false,message:`${existingEvent.capacity.totalSeats-existingEvent.capacity.registered} tickets left`})
        }
        const Booking = await Book.create({
            event:id,
            user:userId,
            seatsBooked:bookedTicket,
        })
        if(Booking.paymentStatus==="Completed"){
        existingEvent.capacity.registered+=bookedTicket;
        }
        existingEvent.save();
        res.status(200).json({success:true,message:`${bookedTicket} Ticket Booked`,booked:Booking});

    } catch (error) {
        console.log("Error in Booking Ticket:"+error.message);
        return res.status(400).json({success:false,message:"Error in Bokking Ticket:"+error.message});
    }
}

export const rating = async (req,res) => {
    try {
        const id = req.params.id;
        const userid = req.user;
        const{name,rating,comment}=req.body
        if(!name||!rating||!comment)
        {
            return res.status(400).json({success:false,message:"Fill All Feilds"});
        }
        const existUser = await User.findById(userid)
        if(!existUser)
        {
            return res.status(400).json({success:false,message:`Not Authorized User`})
        }
        const existingEvent = await Event.findById(id);
        if(!existingEvent)
        {
            return res.status(400).json({success:false,message:`No FeedBack for ${existingEvent.title}`})
        }
        const existingRating = await Rating.findOne({
            user:userid
        })
        if(existingRating)
        {
            return res.status(400).json({success:false,message:`Already Given Feedback`})
        }
        const newRating = await Rating.create({
            user:userid,event:id,rating,comment,status:"Approved"
        });
        res.status(200).json({success:true,message:"Feeback Complete",data:newRating});
    } catch (error) {
        console.log("FeedBack Error :"+error.message);
        return res.status(400).json({success:false,message:error.message})
    }
}

export const onboard = async(req,res)=>{
    try {
        const {fullName,state,phoneNumber,language}=req.body;
        const id = req.user.id
        let profilePic = null;
        if(!fullName || !state || !phoneNumber || !language)
        {
            return res.status(400).json({success:false,message:"Fill all Fields"})
        }

        const ExistingUser = await User.findById(id)

        if (!ExistingUser) {
            return res.status(400).json({success:false,message:"User Not found"})
        }

        if (!req.file) {
    return res.status(400).json({success: false,message: "Image not uploaded"});
  }
        if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "EventHandle"
      });

      profilePic= {
        mediaType: req.file.mimetype.startsWith("image") ? "image" : "video",
        mediaUrl: result.secure_url,
        publicId: result.public_id
      };

      fs.unlinkSync(req.file.path);
    }


        const InfoUpdate = await User.findByIdAndUpdate(id,{fullName,state,phoneNumber,language,profilePic,isOnboarded:true},{ new: true });

        res.status(200).json({success:true,message:"Successfully Onboarded",data:InfoUpdate})
    } catch (error) {
            return res.status(400).json({success:false,message:"Error in Onboard "+error.message})
    }
}