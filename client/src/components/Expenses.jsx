import {
  Box,
  Flex,
  HStack,
  Select,
  Stack,
  useDisclosure,
  useColorModeValue,
  color,
  Text,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AddExpenses from "./AddExpenses";
import ExpenseList from "./ExpenseList";
import EditExpense from "./EditExpense";
import SelectCategory from "./SelectCategory";
import CategoryExpenses from "./CategoryExpenses";
import { ExpensesContext } from "../global_context/ExpenseProvider";
import { Reset } from "@styled-icons/boxicons-regular/Reset";

const Expenses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExpense, setSelectedExpense] = useState(null);

  const {
    expenses,
    categories,
    selectedCategory,
    setExpenses,
    setSelectedCategory,
    fetchExpenses,
  } = useContext(ExpensesContext);

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    onOpen();
  };

  const handleCategoryChange = (event) => {
    // if (selectedCategory !== "") {
    //   setSelectedCategory(event.target.value);
    // } else {
    //   fetchExpenses();
    // }
    setSelectedCategory(event.target.value);
  };

  const boxBg = useColorModeValue(
    "background.secondary",
    "background.secondaryDark"
  );
  const borderColor = useColorModeValue(
    "borders.default",
    "borders.defaultDark"
  );

  return (
    <Flex direction="column" mt={10} alignItems="center" maxWidth="100%">
      <Flex
        width="100%"
        justifyContent="flex-end"
        alignItems={"center"}
        gap={5}
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
        <Box
          bg={boxBg}
          p={4}
          borderRadius="md"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <AddExpenses fetchExpenses={fetchExpenses} />
        </Box>
        <Box flex="1" ml={4} p={4}>
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
        <Box mt={10} p={4} ml={3} borderRadius="md">
          <CategoryExpenses expenses={expenses} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Expenses;
