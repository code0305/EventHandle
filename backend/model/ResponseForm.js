import mongoose from "mongoose";

const feedbackResponseSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  responses: [
    {
      questionId: String,
      answer: mongoose.Schema.Types.Mixed
    }
  ]

}, { timestamps: true });

export const Response = mongoose.model("FeedbackResponse", feedbackResponseSchema);