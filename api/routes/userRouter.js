import express from "express";
import {
  userLogin,
  userProfile,
  userRegister,
  userLogout,
  userNewExpenses,
  getUserExpenses,
  deleteUserExpenses,
  updateUserExpenses,
  getUserExpensesCategories,
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

//delete expenses
userRouter.delete("/expenses/:id", verifyToken, deleteUserExpenses);

//update expenses
userRouter.put("/expenses/:id", verifyToken, updateUserExpenses);

//get all categories
userRouter.get("/categories", verifyToken, getUserExpensesCategories);

export default userRouter;
