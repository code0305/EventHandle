import express from "express"
import { logout, me, onboard, reset, signin, signup, UpdatePassword, verification } from "../Controllers/authController.js";
import { authUser } from "../Middleware/authUser.js";
import upload from "../Middleware/upload.js";

const authRouter = express.Router();

authRouter.post("/signin",signin);
authRouter.post("/signup",signup);
authRouter.post('/reset',reset);
authRouter.post('/verify/:help',verification);
authRouter.post('/update-password/:help',UpdatePassword);
authRouter.get('/info',authUser,me);
authRouter.post('/onboard',authUser,upload.single("profilePic"),onboard)
authRouter.post('/logout',logout);

export default authRouter;
