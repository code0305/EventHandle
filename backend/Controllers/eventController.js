import { Event } from "../model/Event.js";
import cloudinary from "../services/cloudinary.js";
import fs from "fs";
export const AddEvent =async(req,res) => {
 try {
    const data = req.body;
    const media = [];
    for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path,{
                folder:"EventHandle"
            })

            media.push({
                mediaType:file.mimetype.startsWith("image")?"image":"video",
                mediaUrl:result.secure_url,
                publicId:result.public_id
            })
            fs.unlinkSync(file.path)
    }
    const event = {
      title: data.title,
      category: data.category,
      description: data.description,
      schedule: {
        startDate: data.startDate,
        endDate: data.endDate,
      },
      venue: {
        modeEvent: data.modeEvent,
        connectionLink: data.connectionLink,
        address: data.address,
        city: data.city,
        state: data.state,
      },
      organizer: {
        name: data.organizerName,
        email: data.organizerEmail,
        phone: data.organizerPhone,
      },
      pricing: {
        amount: data.amount,
        pmode: data.pmode,
      },
      capacity: {
        totalSeats: data.totalSeats,
      },
      bannerUrl:media
    };
    const newPost = await Event.create(event);
if (
  !data.title ||
  !data.description ||
  !data.category
) {
  return res.status(400).json({
    success: false,
    message: "All fields are required",
  });
}
    res.status(200).json({
      success:true,
      message: "Event created successfully",
      newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false , message: "Error creating event" });
  }
}

export const getAllEvents = async (req,res) => {
  try {
    const data = await Event.find();
    if(!data)
    {
          return res.status(400).json({success:false,message:"Data is Empty"})
    }
    res.status(200).json({success:true,message:"Event Data",data:data})
  } catch (error) {
      return res.status(400).json({success:false,message:"Data is Empty: "+error.message});
  }
}