import {
  Box,
  Flex,
  HStack,
  Select,
  Stack,
  useDisclosure,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AddExpenses from "./AddExpenses";
import ExpenseList from "./ExpenseList";
import EditExpense from "./EditExpense";
import SelectCategory from "./SelectCategory";
import CategoryExpenses from "./CategoryExpenses";
import { ExpensesContext } from "../global_context/ExpenseProvider";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

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

  //neumorphism
  const boxBg = useColorModeValue("#f0f0f3", "#1e1e1e");
  const shadowLight = useColorModeValue("#ffffff", "#3b3b3b");
  const shadowDark = useColorModeValue("#b0b0b0", "#0d0d0d");
  const bgColor = useColorModeValue("#e0e0e0", "#1a1a1a");

  const neumorphismStyle = {
    backgroundColor: bgColor,
    borderRadius: "15px",
    borderWidth: "2px",
    boxShadow: `4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`,
  };

  return (
    <Flex direction="column" mt={10} alignItems="center" maxWidth="100%">
      {expenses.length > 0 && (
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
      )}

      <Flex>
        <Box style={neumorphismStyle} p={4}>
          <AddExpenses fetchExpenses={fetchExpenses} />
        </Box>
        {expenses.length > 0 ? (
          <Box style={neumorphismStyle} flex="1" ml={4} p={4}>
            <ExpenseList
              expenses={expenses}
              fetchExpenses={fetchExpenses}
              onEdit={handleEdit}
            />
          </Box>
        ) : (
          <Box style={neumorphismStyle} flex="1" ml={4} p={4}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              height="100%"
              flexDirection={"column"}
            >
              <Text fontSize="20px" fontWeight="700">
                Empty Expense List
              </Text>
              <Text fontSize="20px" fontWeight="700">
                Add Expenses
              </Text>
            </Flex>
          </Box>
        )}
        {selectedExpense && (
          <EditExpense
            isOpen={isOpen}
            onClose={onClose}
            expense={selectedExpense}
            fetchExpenses={fetchExpenses}
          />
        )}
        {expenses.length > 0 && (
          <Box style={neumorphismStyle} mt={10} p={4} ml={3}>
            <CategoryExpenses expenses={expenses} />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Expenses;
