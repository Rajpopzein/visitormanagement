import { Router } from "express";
import userRoute from "./userroute/userRoute.js";


const router = Router();

router.use('/', userRoute)

export default router

