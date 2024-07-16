import { Box, FormLabel } from "@chakra-ui/react";
import React, { useEffect } from "react";

const ExpenseList = ({ expenses, fetchExpenses }) => {
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);
  return (
    <Box ml={9}>
      <FormLabel>Expenses</FormLabel>
      {expenses.length > 0 ? (
        expenses.map((expense) => (
          <Box key={expense._id} p={4} borderWidth={1} borderRadius="md" mb={4}>
            <p>
              <strong>Date:</strong> {expense.date}
            </p>
            <p>
              <strong>Amount:</strong> ${expense.amount.toFixed(2)}
            </p>
            <p>
              <strong>Category:</strong> {expense.category}
            </p>
            <p>
              <strong>Description:</strong> {expense.description}
            </p>
          </Box>
        ))
      ) : (
        <p>No expenses found.</p>
      )}
    </Box>
  );
};

export default ExpenseList;
