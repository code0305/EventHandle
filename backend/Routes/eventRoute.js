
import express from "express"
import { authUser } from "../Middleware/authUser.js";
import upload from "../Middleware/upload.js";
import { AddEvent, DeleteEvent, getAllEvents } from "../Controllers/eventController.js";
const PostRouter = express.Router()

PostRouter.post("/create",authUser,upload.array("bannerUrl"),AddEvent);
PostRouter.get("/events",authUser,getAllEvents);
PostRouter.delete("/delete/:id",authUser,DeleteEvent)

export default PostRouter;