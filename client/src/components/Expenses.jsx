import {
  Box,
  Flex,
  HStack,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AddExpenses from "./AddExpenses";
import ExpenseList from "./ExpenseList";
import EditExpense from "./EditExpense";
import SelectCategory from "./SelectCategory";
import CategoryExpenses from "./CategoryExpenses";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [expenses]);

  const fetchExpenses = useCallback(async () => {
    try {
      let url = "http://127.0.0.4:4000/users/expenses";
      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        console.error("failed to fetch data");
      }
    } catch (err) {
      console.error(err.message);
    }
  }, [selectedCategory]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.4:4000/users/categories", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error(response.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    onOpen();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Flex direction="column" mt={10} alignItems="center" maxWidth="100%">
      <Flex
        width="100%"
        justifyContent="flex-end"
        mb={4}
        mr={20}
        direction={"row"}
      >
        <SelectCategory
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          categories={categories}
        />
      </Flex>

      <Flex>
        <Box>
          <AddExpenses fetchExpenses={fetchExpenses} />
        </Box>
        <Box flex="1" ml={4}>
          <ExpenseList
            expenses={expenses}
            fetchExpenses={fetchExpenses}
            onEdit={handleEdit}
          />
        </Box>
        {selectedExpense && (
          <EditExpense
            isOpen={isOpen}
            onClose={onClose}
            expense={selectedExpense}
            fetchExpenses={fetchExpenses}
          />
        )}
        <Box mt={10}>
          <CategoryExpenses expenses={expenses} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Expenses;
