import { Router } from "express";
import { createUser, createUserRole, fetchAllroles, login, visitorRequest } from "../../controller/usercontroller/userController.js";
import userPayloadValidatior from "../../middleware/usermiddleware/userMiddleWare.js";

const userRoute = Router();

userRoute.post("/createuser",userPayloadValidatior.userCreationPayload, createUser);

userRoute.post("/createuserrole", createUserRole);

userRoute.get('/fetchallroles', fetchAllroles)

userRoute.post('/login', login)

userRoute.post('/visitor', userPayloadValidatior.visitorPayload, visitorRequest)

export default userRoute
