import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  Stack,
  Select,
  Card,
  CardHeader,
  CardBody,
  Divider,
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

  const bdColor = useColorModeValue(
    "border.secondaryDark",
    "background.secondary"
  );

  const textColor = useColorModeValue("text.primary", "text.primaryDark");
  const bgColor = useColorModeValue("#3182CE", "#90CDF4");

  return (
    <Box mb={4} ml={10}>
      <Heading size="md" mb={4}>
        Summary
      </Heading>
      <Box borderWidth={1} borderRadius="md" p={2}>
        <Select
          mb={4}
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          width="120px"
          borderColor="#dedcdc"
          backgroundColor={bgColor}
          color={textColor}
          borderWidth={2}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Select>
        <Card
          mb={4}
          width="220px"
          boxShadow={"lg"}
          borderWidth="1px"
          borderColor={bdColor}
        >
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
      <Box
        maxHeight="200px"
        overflowY="auto"
        p={2}
        borderWidth={1}
        borderRadius="md"
      >
        <Stack spacing={2}>
          {sortedCategories.map(({ category, amount }) => (
            <Card
              key={category}
              maxWidth="160px"
              boxShadow={"lg"}
              borderWidth="1px"
              borderColor={bdColor}
            >
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
