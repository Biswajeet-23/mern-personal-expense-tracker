import {
  Box,
  Flex,
  HStack,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AddExpenses from "./AddExpenses";
import ExpenseList from "./ExpenseList";
import EditExpense from "./EditExpense";
import SelectCategory from "./SelectCategory";
import CategoryExpenses from "./CategoryExpenses";
import { ExpensesContext } from "../global_context/ExpenseProvider";

const Expenses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExpense, setSelectedExpense] = useState(null);

  const {
    expenses,
    categories,
    selectedCategory,
    setSelectedCategory,
    fetchExpenses,
  } = useContext(ExpensesContext);

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
