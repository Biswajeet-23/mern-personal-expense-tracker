import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../global_context/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddExpenses = ({ fetchExpenses }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");

  const toast = useToast();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const expense = {
        date: date.toISOString().split("T")[0],
        amount: parseFloat(amount),
        category: category === "Other" ? customCategory : category,
        description,
      };
      // console.log(JSON.stringify(expense));
      let response = await fetch("http://127.0.0.4:4000/users/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
        credentials: "include",
      });
      if (response.status === 200) {
        toast({
          title: "Expense added.",
          description: "Your expense has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchExpenses();
      } else {
        toast({
          title: "Error.",
          description: "Your expense has not been added.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="date" mb={4} isRequired>
        <FormLabel>Date</FormLabel>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </FormControl>

      <FormControl id="amount" mb={4} isRequired>
        <FormLabel>Amount</FormLabel>
        <Input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </FormControl>

      <FormControl id="category" mb={4} isRequired>
        <FormLabel>Category</FormLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled hidden>
            Select category
          </option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </Select>
        {category === "Other" && (
          <Input
            mt={2}
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
          />
        )}
      </FormControl>

      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <Button type="submit" colorScheme="blue" width="140px">
        Add Expense
      </Button>
    </form>
  );
};

export default AddExpenses;
