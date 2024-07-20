import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Textarea,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../utils/config";

const EditExpense = ({ isOpen, onClose, expense, fetchExpenses }) => {
  const [date, setDate] = useState(new Date(expense.date));
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState(expense.description);

  useEffect(() => {
    if (expense) {
      setDate(new Date(expense.date));
      setAmount(expense.amount);
      setCategory(expense.category);
      setDescription(expense.description);
    }
  }, [expense]);

  const toast = useToast();

  const formatDate = (date) => {
    const offset = date.getTimezoneOffset();
    const newDate = new Date(date.getTime() - offset * 60 * 1000);
    return newDate.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const updatedExpense = {
        date: formatDate(date),
        amount: parseFloat(amount),
        category: category === "Other" ? customCategory : category,
        description,
      };
      const response = await fetch(
        `${BASE_URL}/users/expenses/${expense._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense),
          credentials: "include",
        }
      );
      if (response.status === 200) {
        toast({
          title: "Expense updated.",
          description: "Your expense has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        fetchExpenses();
      } else {
        toast({
          title: "Error.",
          description: "There was an issue updating the expense.",
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
  const bgColor = useColorModeValue("#f0f0f3", "#2c2c2c");
  const bdColor = useColorModeValue("#e0e0e0", "#1f1f1f");
  const shadowLight = useColorModeValue("#ffffff", "#3b3b3b");
  const shadowDark = useColorModeValue("#b0b0b0", "#1a1a1a");

  const neumorphismStyle = {
    backgroundColor: bgColor,
    borderColor: bdColor,
    borderRadius: "15px",
    borderWidth: "2px",
    boxShadow: `4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        style={{
          backgroundColor: bgColor,
          borderColor: bdColor,
          borderRadius: "15px",
          borderWidth: "2px",
        }}
      >
        <ModalHeader>Edit Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="date" mb={4} isRequired>
            <FormLabel>Date</FormLabel>
            <Box p={2}>
              <DatePicker
                id="date"
                showIcon
                dateFormat="dd/MM/yyyy"
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
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Update Expense
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditExpense;
