
import express from "express"
import { authUser } from "../Middleware/authUser.js";
import upload from "../Middleware/upload.js";
import { AddEvent, DeleteEvent, EventByID, getAllEvents, getBycategory } from "../Controllers/eventController.js";
const PostRouter = express.Router()

PostRouter.post("/create",authUser,upload.array("bannerUrl"),AddEvent);
PostRouter.get("/event/:category",authUser,getBycategory);
PostRouter.get("/events",authUser,getAllEvents);
PostRouter.get("/details/:id",authUser,EventByID);
PostRouter.delete("/delete/:id",authUser,DeleteEvent);


export default PostRouter;