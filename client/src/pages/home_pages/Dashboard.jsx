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
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ExpensesContext } from "../../global_context/ExpenseProvider";
import { motion } from "framer-motion";
import { CurrencyRupee } from "@styled-icons/heroicons-solid/CurrencyRupee";

const MotionBox = motion(Box);

const Dashboard = () => {
  const { expenses } = useContext(ExpensesContext);
  const theme = useTheme();

  const headingColor = useColorModeValue("text.primary", "text.primaryDark");
  const textColor = useColorModeValue("text.primary", "text.primaryDark");
  const chartBarColor = theme.colors.accent?.primary || "#FFAB91";
  const chartLineColor = theme.colors.accent?.secondary || "#A3C4F3";
  const containerWidth = useBreakpointValue({ base: "100%", md: "80%" });
  const cardColor = useColorModeValue(
    "hoverbutton.light",
    "hoverbutton.secondaryDark"
  );
  const borderLine = useColorModeValue("background.light", "background.light");

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

  // Define Neumorphism styles
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
    <Box p={5}>
      {expenses.length > 0 ? (
        <Box>
          <Box mb={10} style={neumorphismStyle}>
            <Heading fontSize="24px" mb={5} color={headingColor}>
              Spending by Category
            </Heading>
            <Flex justifyContent={"space-between"} align={"center"}>
              <ResponsiveContainer width="50%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="80%"
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getRandomColor()}
                        style={{
                          filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Box mr={10} style={neumorphismStyle}>
                <Flex direction={"column"} alignItems={"center"}>
                  <Flex width="300px" justify={"space-between"}>
                    <Text>Min</Text>
                    <Text>Max</Text>
                  </Flex>
                  <Box
                    borderRadius={25}
                    bg={"black"}
                    mt={3}
                    width={"350px"}
                    bgColor={cardColor}
                    height="70px"
                    borderColor={borderLine}
                    borderWidth={2}
                    padding={4}
                  >
                    <Flex justifyContent={"space-between"}>
                      <HStack>
                        <Box>
                          <CurrencyRupee size={22} />
                        </Box>
                        <Text fontSize="20" fontWeight="900">
                          {minExpense}
                        </Text>
                      </HStack>
                      <HStack>
                        <Box>
                          <CurrencyRupee size={22} />
                        </Box>
                        <Text fontSize="20" fontWeight="900">
                          {maxExpense}
                        </Text>
                      </HStack>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>

          <Box mt={10} style={neumorphismStyle}>
            <Heading fontSize="24px" mb={5} color={headingColor}>
              Spending Over Time
            </Heading>
            <ResponsiveContainer width="65%" height={350}>
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
                <XAxis
                  dataKey="date"
                  tick={{
                    fill: useColorModeValue("text.primary", "white"),
                  }}
                />
                <YAxis
                  tick={{ fill: useColorModeValue("text.primary", "white") }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke={chartLineColor}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      ) : (
        <Box flex="1" ml={4} p={4} borderRadius="md" style={neumorphismStyle}>
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
    </Box>
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
