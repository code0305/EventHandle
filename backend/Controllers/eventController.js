import { Event } from "../model/Event.js";
import { Form } from "../model/FeedbackForm.js";
import cloudinary from "../services/cloudinary.js";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import fs from "fs";
import { updateEventStatuses } from "../util/updateStatus.js";
import { Book } from "../model/Booking.js";
import { Response } from "../model/ResponseForm.js";
import { Ticket } from "../ConstantPage/constantPages.js";
import sendEmail from "../services/mailer.js";


// Events
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
            },{returnDocument: "after"}
        );
        res.status(200).json({ success: true, message: "Event Updated Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error while updating event: " + error.message });
    }
}

export const getBycategory = async (req,res) => {
  try {
    const category = req.params.category;
    await updateEventStatuses();
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

export const EventByID = async (req, res) => {
  try {
    const id = req.params.id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event Data Not Found"
      });
    }

    const bookings = await Book.find({
      event: id,
      bookingStatus: "Confirmed"
    });

    const bookedSeats = bookings.reduce(
      (acc, b) => acc + b.seatsBooked,
      0
    );

    const totalSeats = event.capacity.totalSeats;

    const availableSeats =
      totalSeats === null
        ? null
        : totalSeats - bookedSeats;

    res.status(200).json({
      success: true,
      message: "Event Data",
      data: {
        ...event.toObject(),
        availableSeats
      }
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while fetching event: " + error.message
    });
  }
}

// Feedback

export const createFeedbackForm = async (req, res) => {
  try {
    const { eventId, questions } = req.body;

    if (!questions) {
      return res.status(400).json({success: false, message: "Questions are required"});
    }

    const form = await Form.create({eventId,questions});

    res.status(201).json({success: true,message: "Feedback form created",data: form});

  } catch (error) {
    res.status(500).json({ success: false, message: "Create Feedback Form error "+error.message });
  }
};

export const getFeedbackForm = async (req, res) => {
  try {
    const { eventId } = req.params;

    const form = await Form.findOne({ eventId });

    if (!form) {
      return res.json({success: false,message: "No feedback form available"});
    }

    res.status(200).json({success: true,data: form});

  } catch (error) {
    res.status(500).json({ success: false, message: "Get Feedback Form error " + error.message });
  }
};

export const submitFeedback = async (req, res) => {
  try {
    const { eventId, responses } = req.body;
    const userId = req.user.id;

    if (!eventId) {
      return res.status(400).json({success: false,message: "No Such Event Exist"});
    }


    const form = await Form.findOne({ eventId });

    if (!form) {
      return res.status(400).json({success: false,message: "Feedback form not found"});
    }

    if (responses.length !== form.questions.length) {
      return res.status(400).json({success: false,message: "All questions must be answered"});
    }

    for (let r of responses) 
      {
      const q = form.questions.find(q => q.questionId === r.questionId);

      if (!q) {
        return res.status(400).json({success: false,message: "Invalid questionId"});
      }

      if (q.type === "rating") {
        const num = Number(r.answer);
        if (num < 1 || num > 5) {
          return res.status(400).json({success: false,message: "Rating must be between 1 and 5"});
        }
        r.answer = num;
      }

      if (q.type === "text" || q.type === "textarea") {
        if (r.answer.trim() === "") {
          return res.status(400).json({success: false,message: "Text answer required"});
        }
        r.answer = r.answer.trim();
      }
    }

    const feedback = await Response.create(
      { eventId, userId ,responses}
    );

    return res.status(200).json({success: true,message: "Feedback submitted successfully",data: feedback});

  } catch (error) {
    return res.status(500).json({success: false,message: "Update Feedback error"});
  }
};


export const getUserResponse = async (req,res) => {
  try {
    const {id} = req.params
    const response = await Response.findOne({eventId:id,userId:req.user.id})
    if(!response)
    {
      return res.status(200).json({success:false,message:"No feedback"})
    }
    res.status(200).json({success:true,message:'Feedback Submitted'});
  } catch (error) {
       res.status(400).json({success:false,message:"Error in UserResponse "+error.message})

  }
}

export const getAllResponses = async (req, res) => {
  try {
    const { eventId } = req.params;

    const responses = await FeedbackResponse.find({ eventId });

    res.status(200).json({success: true,data: responses});

  } catch (error) {
    res.status(500).json({ success:false,message: "Response error"+error.message });
  }
};

// Booking



export const createBooking = async (req, res) => { 
      try { 
        const { eventId, userId, seats } = req.body; 

        const user = req.user; const event = await Event.findById(eventId); 

        if (!event) 
          { return res.status(404).json({ success: false, message: "Event not found" }); } 

        const bookings = await Book.find({ event: eventId, bookingStatus: "Confirmed" });
        
        const bookedSeats = bookings.reduce( (acc, booking) => acc + booking.seatsBooked, 0 );
        
        const totalSeats = event.capacity.totalSeats; 
        
        if ( totalSeats !== null && seats > (totalSeats - bookedSeats) )
          
          { return res.status(400).json({ success: false, message: "Not enough seats available" }); } 
        
        const booking = await Book.create({ event: eventId, user: userId, seatsBooked: seats });
        
        const qrPath = `qr/${booking._id}.png`; 
        
        await QRCode.toFile( qrPath, JSON.stringify({ bookingId: booking._id, eventId, userId, seats }), { width: 300 } ); 
        
        const qrUpload = await cloudinary.uploader.upload( qrPath, { folder: "event" } ); 
        
        booking.qrCodeUrl = qrUpload.secure_url; 
        
        booking.qrCodePublicId = qrUpload.public_id; 
        
        await booking.save(); 
        
        await sendEmail( user.email, "Your Event Ticket 🎟️", Ticket({ name: user.fullName, eventName: event.title, seats, bookingId: booking._id, qrCodeUrl: qrUpload.secure_url }) ); 
        
        fs.unlinkSync(qrPath); 
        
      res.status(200).json({ success: true, message: "Booking successful", booking });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

export const fetechBookedUsers = async (req, res) => {
  try {
    const { eventId } = req.params;

    const bookings = await Book.find({ event: eventId })
      .populate("user", "fullName email");

    res.status(200).json({success:true,message: "Feteched Users",bookings});
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
}