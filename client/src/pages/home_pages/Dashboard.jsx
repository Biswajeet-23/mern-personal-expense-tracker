import React, { useContext, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  Heading,
  Text,
  useBreakpointValue,
  useTheme,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ExpensesContext } from "../../global_context/ExpenseProvider";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Dashboard = () => {
  const { expenses } = useContext(ExpensesContext);
  const theme = useTheme();

  // Ensure theme values are set, otherwise use default values
  const bgColor = theme.colors.background?.light || "#E1F5FE";
  const headingColor = theme.colors.text?.primary || "#2D3436";
  const textColor = theme.colors.text?.secondary || "#636E72";
  const chartBarColor = theme.colors.accent?.primary || "#FFAB91";
  const chartLineColor = theme.colors.accent?.secondary || "#A3C4F3";
  const containerWidth = useBreakpointValue({ base: "100%", md: "80%" });

  const categoryData = useMemo(() => {
    const data = {};
    expenses.forEach((expense) => {
      const category = expense.category || "Uncategorized";
      if (!data[category]) {
        data[category] = 0;
      }
      data[category] += expense.amount;
    });
    return Object.keys(data).map((key) => ({ name: key, value: data[key] }));
  }, [expenses]);

  const formattedExpenses = useMemo(() => {
    const aggregatedData = {};
    expenses.forEach((expense) => {
      const date = format(new Date(expense.date), "MM/dd/yyyy");
      if (!aggregatedData[date]) {
        aggregatedData[date] = 0;
      }
      aggregatedData[date] += expense.amount;
    });
    return Object.keys(aggregatedData)
      .map((date) => ({ date, amount: aggregatedData[date] }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [expenses]);

  const minExpense = useMemo(() => {
    return Math.min(...categoryData.map((item) => item.value));
  }, [categoryData]);

  const maxExpense = useMemo(() => {
    return Math.max(...categoryData.map((item) => item.value));
  }, [categoryData]);

  return (
    <MotionBox
      p={5}
      bg={bgColor}
      borderRadius="md"
      boxShadow="lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Box mb={10}>
        <Heading size="lg" mb={5} color={headingColor}>
          Spending by Category
        </Heading>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              fill={chartBarColor}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <Text mt={4} fontSize="lg" color={textColor}>
          Min Expense: ${minExpense}
          <br />
          Max Expense: ${maxExpense}
        </Text>
      </Box>
      <Box>
        <Heading size="lg" mb={5} color={headingColor}>
          Spending Over Time
        </Heading>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={formattedExpenses}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill={chartBarColor} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box mt={10}>
        <Heading size="lg" mb={5} color={headingColor}>
          Spending Over Time
        </Heading>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={formattedExpenses}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke={chartLineColor} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </MotionBox>
  );
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default Dashboard;
