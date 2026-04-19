import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String
  },

  category: {
    type: String,
    enum: ["Technology","Education","Entertainment","Business","Sports","Cultural","Community"],
    required: true
  },

  schedule: {
    startDate: { type: Date },
    endDate: { type: Date }
  },

  venue: {
    modeEvent: {
      type: String,
      enum: ["Offline", "Online", "Hybrid"],
    },
    connectionLink: String,
    address: String,
    city: String,
    state: String
  },

  organizer: {
    name: { type: String , required: true},
    email: String,
    phone: String
  },

  pricing: {
    isPaid: { type: String},
    amount: { type: Number, default: 0 },
    pmode:{
      type: String,
      enum:["Online","On-spot"]
    }
  },
  limit:Boolean,
  capacity: {
    totalSeats: { type: Number, min: 0 },
    registered: String
  },

  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
    default: "Upcoming"
  },

  bannerUrl: [     {
            mediaType:{
                type:String,
            },
            mediaUrl:{
                type:String
            },
            publicId:{
                type:String
                },
        }
      ]

}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);