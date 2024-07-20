import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  Stack,
  Select,
  Card,
  CardBody,
  HStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { CurrencyRupee } from "@styled-icons/heroicons-solid/CurrencyRupee";
import { Category } from "@styled-icons/boxicons-solid/Category";
import { PiggyBank } from "@styled-icons/fa-solid/PiggyBank";

const CategoryExpenses = ({ expenses }) => {
  const [timePeriod, setTimePeriod] = useState("monthly");
  const [totalSpending, setTotalSpending] = useState(0);
  const [spendingByCategory, setSpendingByCategory] = useState({});

  useEffect(() => {
    calculateSummary(expenses);
  }, [expenses, timePeriod]);

  const calculateSummary = (expenses) => {
    let filteredExpenses = expenses;

    const now = new Date();
    switch (timePeriod) {
      case "daily":
        filteredExpenses = expenses.filter(
          (expense) =>
            new Date(expense.date).toDateString() === now.toDateString()
        );
        break;
      case "weekly": {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        filteredExpenses = expenses.filter(
          (expense) => new Date(expense.date) >= startOfWeek
        );
        break;
      }
      case "monthly":
        filteredExpenses = expenses.filter(
          (expense) => new Date(expense.date).getMonth() === now.getMonth()
        );
        break;
      default:
        break;
    }

    const total = filteredExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    setTotalSpending(total);

    const categorySpending = filteredExpenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});

    setSpendingByCategory(categorySpending);
  };

  const sortedCategories = Object.entries(spendingByCategory)
    .sort(([, a], [, b]) => b - a)
    .map(([category, amount]) => ({ category, amount }));

  //Neumorphism styles
  const bgColor = useColorModeValue("#e0e0e0", "#1a1a1a");
  const shadowLight = useColorModeValue("#ffffff", "#3b3b3b");
  const shadowDark = useColorModeValue("#b0b0b0", "#0d0d0d");

  const neumorphismStyle = {
    backgroundColor: bgColor,
    boxShadow: `4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`,
    borderRadius: "15px",
    padding: "10px",
    marginBottom: "10px",
  };

  return (
    <Box mb={4} ml={10}>
      <Heading size="md" mb={4}>
        Summary
      </Heading>
      <Box style={neumorphismStyle}>
        <Select
          mb={4}
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          width="120px"
          borderWidth={0}
          style={{
            ...neumorphismStyle,
            backgroundColor: bgColor,
          }}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Select>
        <Card style={neumorphismStyle}>
          <CardBody>
            <Flex alignItems={"center"} gap={7}>
              <Box>
                <PiggyBank size={30} />
              </Box>
              <Flex direction={"column"}>
                <HStack>
                  <Heading size="sm">Total Spending</Heading>
                </HStack>
                <HStack mt={2}>
                  <Box>
                    <CurrencyRupee size={22} />
                  </Box>
                  <Text fontSize="xl" fontWeight="bold">
                    {totalSpending.toFixed(2)}
                  </Text>
                </HStack>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Box>
      <Heading size="sm" mt={4} mb={3}>
        Spending by Category
      </Heading>
      <Box maxHeight="200px" overflowY="auto" p={2} style={neumorphismStyle}>
        <Stack spacing={2}>
          {sortedCategories.map(({ category, amount }) => (
            <Card key={category} style={neumorphismStyle}>
              <CardBody>
                <Flex direction={"column"} gap={1}>
                  <HStack>
                    <Box>
                      <Category size={15} />
                    </Box>
                    <Heading fontSize="sm">{category}</Heading>
                  </HStack>
                  <HStack>
                    <Box>
                      <CurrencyRupee size={22} />
                    </Box>
                    <Text fontSize="xl" fontWeight="bold">
                      {amount.toFixed(2)}
                    </Text>
                  </HStack>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default CategoryExpenses;
