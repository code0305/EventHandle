
import express from "express"
import { authUser } from "../Middleware/authUser.js";
import upload from "../Middleware/upload.js";
import { AddEvent, createBooking, createFeedbackForm, DeleteEvent, EventByID, fetechBookedUsers, getAllEvents, getAllResponses, getBycategory, getFeedbackForm, getUserResponse, submitFeedback, updateEvent } from "../Controllers/eventController.js";
const PostRouter = express.Router()

PostRouter.post("/create",authUser,upload.array("bannerUrl"),AddEvent);
PostRouter.get("/event/:category",authUser,getBycategory);
PostRouter.get("/events",authUser,getAllEvents);
PostRouter.get("/details/:id",authUser,EventByID);
PostRouter.get("/bookings/:eventId",fetechBookedUsers);
PostRouter.delete("/delete/:id",authUser,DeleteEvent);
PostRouter.put("/update/:id",authUser,upload.fields([{ name: "logo", maxCount: 1 },{ name: "banner", maxCount: 1 }]),updateEvent);

PostRouter.post("/book", createBooking);
PostRouter.get("/responses/:eventId", authUser, getAllResponses);

PostRouter.post("/form", authUser, createFeedbackForm);
PostRouter.get("/form/:eventId", authUser,getFeedbackForm);
PostRouter.get("/response/:id",authUser,getUserResponse)
PostRouter.post("/submit", authUser, submitFeedback);

export default PostRouter;