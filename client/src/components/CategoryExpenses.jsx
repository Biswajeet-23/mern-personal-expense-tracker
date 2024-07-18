import React, { useEffect, useState } from "react";
import { Box, Text, Heading, Stack, Select } from "@chakra-ui/react";

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

  return (
    <Box p={5} borderWidth={1} borderRadius="md" mb={4}>
      <Heading size="md" mb={4}>
        Summary
      </Heading>
      <Select
        mb={4}
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value)}
        borderColor="#dedcdc"
        borderWidth={2}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </Select>
      <Text>Total Spending: ${totalSpending.toFixed(2)}</Text>
      <Heading size="sm" mt={4}>
        Spending by Category
      </Heading>
      <Stack spacing={2} mt={2}>
        {Object.keys(spendingByCategory).map((category) => (
          <Text key={category}>
            {category}: ${spendingByCategory[category].toFixed(2)}
          </Text>
        ))}
      </Stack>
    </Box>
  );
};

export default CategoryExpenses;
