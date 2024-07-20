import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../utils/config";

const AddExpenses = ({ fetchExpenses }) => {
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");

  const toast = useToast();

  const formatDate = (date) => {
    const offset = date.getTimezoneOffset();
    const newDate = new Date(date.getTime() - offset * 60 * 1000);
    return newDate.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expense = {
        date: formatDate(date),
        amount: parseFloat(amount),
        category: category === "Other" ? customCategory : category,
        description,
      };

      let response = await fetch(`${BASE_URL}/users/expenses`, {
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
        setDate(null);
        setAmount("");
        setCategory("");
        setCustomCategory("");
        setDescription("");
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

  // Define color values based on color mode
  const inputBg = useColorModeValue("#e0e0e0", "#1a1a1a");
  const inputBorder = useColorModeValue("#e0e0e0", "#1f1f1f");
  const shadowLight = useColorModeValue("#ffffff", "#3b3b3b");
  const shadowDark = useColorModeValue("#b0b0b0", "#0d0d0d");
  const textColor = useColorModeValue("text.primary", "text.primaryDark");

  const neumorphismStyle = {
    backgroundColor: inputBg,
    borderColor: inputBorder,
    borderRadius: "15px",
    borderWidth: "2px",
    boxShadow: `4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`,
    color: textColor,
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="date" mb={4} isRequired>
        <FormLabel>Date</FormLabel>
        <Box style={neumorphismStyle}>
          <DatePicker
            id="date"
            dateFormat="dd/MM/yyyy"
            showIcon
            selected={date}
            onChange={(date) => setDate(date)}
            customInput={<Input style={neumorphismStyle} />}
          />
        </Box>
      </FormControl>

      <FormControl id="amount" mb={4} isRequired>
        <FormLabel>Amount</FormLabel>
        <Input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={neumorphismStyle}
        />
      </FormControl>

      <FormControl id="category" mb={4} isRequired>
        <FormLabel>Category</FormLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={neumorphismStyle}
        >
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
            style={neumorphismStyle}
          />
        )}
      </FormControl>

      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={neumorphismStyle}
        />
      </FormControl>

      <Button
        type="submit"
        colorScheme="blue"
        width="140px"
        boxShadow={`4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`}
        borderRadius="10px"
        padding="5px 10px"
      >
        Add Expense
      </Button>
    </form>
  );
};

export default AddExpenses;
