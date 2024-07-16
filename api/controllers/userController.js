import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import expenseModel from "../model/expenseModel.js";
config();

//user register
export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userDoc = await userModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).send({ message: "Registration successful" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

//user login
export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await userModel.findOne({ username });
    const checkPass = bcrypt.compareSync(password, userDoc.password);
    if (checkPass) {
      const userId = userDoc._id;
      const token = jwt.sign({ userId }, process.env.JWT_Secret, {
        expiresIn: "7d",
      });
      res.cookie("auth_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res
        .status(200)
        .send({ message: "Login successfull", username, userId });
    } else {
      return res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

//user profile
export const userProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userDetails = await userModel
      .findById(userId)
      .select("-_id -password -__v");
    if (!userDetails) res.status(400).send({ message: "Invalid user" });
    res.status(200).send(userDetails);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something is wrong", errorMessage: err.message });
  }
};

//user logout
export const userLogout = (req, res) => {
  try {
    res.clearCookie("auth_token");
    return res.status(200).send({ message: "Logout Successful" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

//user expenses
export const userNewExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log(userId);
    const { date, amount, category, description } = req.body;
    const expenseDoc = new expenseModel({
      userId: userId,
      date: date,
      amount: amount,
      category: category,
      description: description,
    });
    const response = await expenseDoc.save();
    if (!response) {
      res.status(400).send({ message: "User not found" });
    }
    res.status(200).send({ message: "Expense added successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

export const getUserExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const userExpenses = await expenseModel.find({ userId });
    if (!userExpenses) {
      return res.status(400).send({ message: "User not found" });
    }
    res.status(200).send(userExpenses);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};
