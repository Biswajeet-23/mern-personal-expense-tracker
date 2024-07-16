import express from "express";
import {
  userLogin,
  userProfile,
  userRegister,
  userLogout,
  userNewExpenses,
  getUserExpenses,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/tokenVerification.js";

const userRouter = express.Router();

//register
userRouter.post("/register", userRegister);

//login
userRouter.post("/login", userLogin);

//getProfile
userRouter.get("/profile", verifyToken, userProfile);

//logout
userRouter.post("/logout", userLogout);

//add expense
userRouter.post("/expenses", verifyToken, userNewExpenses);

//get all expense
userRouter.get("/expenses", verifyToken, getUserExpenses);

export default userRouter;
