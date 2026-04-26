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



export const DeleteEvent = async(req,res)=>{
  try {
    const id= req.params.id;
    const ExistingEvent = await Event.findByIdAndDelete(id);
    if(!ExistingEvent)
    {
        return res.status(404).json({success:false,message:"Event Doesn't Exist"})
    }
    return res.status(200).json({success:true,message:"Event Deleted "})
  } catch (error) {
          return res.status(500).json({success:false,message:"Error while Deleting : "+error.message});
  }
}




export const getBycategory = async (req,res) => {
  try {
    const category = req.params.category;
    const data = await Event.find({category: category});
    if(!data)
    {
          return res.status(200).json({success:true,message:"Data is Empty"})
    }
    res.status(200).json({success:true,message:"Event Data",data:data})
  } catch (error) {
      return res.status(400).json({success:false,message:"Data is Empty: "+error.message});
  }
}




export const EventByID =async(req,res)=>{
    try {
    const id = req.params.id;
    const event = await Event.findById(id);
    if(!event)
    {
          return res.status(400).json({success:false,message:"Event Data Not Found"})
    }
    res.status(200).json({success:true,message:"Event Data",data:event})
  } catch (error) {
      return res.status(400).json({success:false,message:"Error while fetching event: "+error.message});
  }
}




export const updateEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const media = []; 

        const existingEvent = await Event.findById(id);
        if (!existingEvent) {
            return res.status(404).json({ success: false, message: "Event Not Found" });
        }
        let updatedBanners = existingEvent.bannerUrl || [];

        if (req.files?.logo) {
            const file = req.files.logo[0];

            const result = await cloudinary.uploader.upload(file.path, {
                folder: "EventHandle"
            });

            updatedBanners[0] = {
                mediaType: file.mimetype.startsWith("image") ? "image" : "video",
                mediaUrl: result.secure_url,
                publicId: result.public_id
            };

            if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        }

        if (req.files?.banner) {
            const file = req.files.banner[0];

            const result = await cloudinary.uploader.upload(file.path, {
                folder: "EventHandle"
            });

            updatedBanners[1] = {
                mediaType: file.mimetype.startsWith("image") ? "image" : "video",
                mediaUrl: result.secure_url,
                publicId: result.public_id
            };

            if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        }
        const updatedEvent = await Event.findByIdAndUpdate(id,
            {
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
                bannerUrl: updatedBanners
            },{ new: true }
        );
        res.status(200).json({ success: true, message: "Event Updated Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error while updating event: " + error.message });
    }
}