
import express from "express"
import { authUser } from "../Middleware/authUser.js";
import upload from "../Middleware/upload.js";
import { AddEvent, getAllEvents } from "../Controllers/eventController.js";
const PostRouter = express.Router()

PostRouter.post("/create",authUser,upload.array("bannerUrl"),AddEvent);
PostRouter.get("/events",authUser,getAllEvents);

export default PostRouter;