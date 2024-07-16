import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the expense schema
const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create the expense model
const expenseModel = mongoose.model("Expense", expenseSchema);

export default expenseModel;
