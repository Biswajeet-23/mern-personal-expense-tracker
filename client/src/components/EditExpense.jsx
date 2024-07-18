import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        `http://127.0.0.4:4000/users/expenses/${expense._id}`,
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="date" mb={4} isRequired>
            <FormLabel>Date</FormLabel>
            <DatePicker
              id="date"
              showIcon
              dateFormat="dd/MM/yyyy"
              selected={date}
              onChange={(date) => setDate(date)}
            />
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
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
