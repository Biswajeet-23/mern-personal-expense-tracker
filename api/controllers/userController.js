import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import expenseModel from "../model/expenseModel.js";
import { response } from "express";
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

//create user expenses
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

//get all user's expenses
export const getUserExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const { category } = req.query;
    const query = { userId };
    if (category) {
      query.category = category;
    }
    const userExpenses = await expenseModel.find(query);
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

//delete user's expenses
export const deleteUserExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    // console.log(id);
    const reponse = await expenseModel.findByIdAndDelete(id);
    if (!response) {
      res.status(400).send({ message: "Expense not deleted" });
    }
    res.status(200).send({ message: "Expense deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

//update user's expenses
export const updateUserExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, amount, category, description } = req.body;
    const updateExpense = await expenseModel.findByIdAndUpdate(
      id,
      { date, amount, category, description },
      { new: true, runValidators: true }
    );
    if (!updateExpense) {
      res.status(400).send({ message: "Expense not updated" });
    }
    res.status(200).send({ message: "Expense update successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};

//get user's expenses categories
export const getUserExpensesCategories = async (req, res) => {
  try {
    const userId = req.userId;
    const categories = await expenseModel.find(
      { userId },
      { category: 1, _id: 1 }
    );

    // Use a Set to store unique categories
    const uniqueCategories = [];
    const categorySet = new Set();

    categories.forEach((category) => {
      if (!categorySet.has(category.category)) {
        categorySet.add(category.category);
        uniqueCategories.push(category);
      }
    });
    // const categories = await expenseModel.distinct("category", { userId });
    if (!userId) {
      res.status(400).send({ message: "User not found" });
    }
    res.status(200).send(uniqueCategories);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Something is wrong", errorMessage: err.message });
  }
};
