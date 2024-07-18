import {
  Box,
  Card,
  CardBody,
  CardHeader,
  flexbox,
  FormLabel,
  HStack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { CurrencyRupee } from "@styled-icons/heroicons-solid/CurrencyRupee";
import { ChatFill } from "@styled-icons/bootstrap/ChatFill";
import { Category } from "@styled-icons/boxicons-solid/Category";
import { CalendarDateFill } from "@styled-icons/bootstrap/CalendarDateFill";
import { Delete } from "@styled-icons/material-rounded/Delete";
import { Edit } from "@styled-icons/boxicons-solid/Edit";

const ExpenseList = ({ expenses, fetchExpenses, onEdit }) => {
  const toast = useToast();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.4:4000/users/expenses/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        toast({
          title: "Expense deleted.",
          description: "Your expense has been deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchExpenses();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Box ml={15}>
      <FormLabel>Expenses</FormLabel>
      <Box
        maxHeight="500px"
        overflowY="auto"
        p={2}
        borderWidth={1}
        borderRadius="md"
      >
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <Card
              key={expense._id}
              p={4}
              mb={4}
              width={500}
              direction={{ base: "column", sm: "row" }}
            >
              <CardHeader width={190}>
                <HStack spacing={1}>
                  <Box>
                    <Category size={25} />
                  </Box>
                  <Text>{expense.category}</Text>
                </HStack>
              </CardHeader>
              <CardBody width={350}>
                <HStack justifyContent={"space-between"}>
                  <Stack spacing={3}>
                    <HStack>
                      <Box>
                        <CurrencyRupee size={22} />
                      </Box>
                      <Text>{expense.amount.toFixed(2)}</Text>
                    </HStack>
                    <HStack>
                      <Box>
                        <CalendarDateFill size={20} />
                      </Box>
                      <Text>{expense.date.split("T")[0]}</Text>
                    </HStack>
                    <HStack>
                      <Box>
                        <ChatFill size={20} />
                      </Box>
                      <Text>{expense.description}</Text>
                    </HStack>
                  </Stack>
                  <Box cursor={"pointer"}>
                    <Delete
                      size={30}
                      onClick={() => handleDelete(expense._id)}
                      color="red"
                    />
                  </Box>
                  <Box cursor={"pointer"}>
                    <Edit
                      size={30}
                      color="yellow"
                      onClick={() => onEdit(expense)}
                    />
                  </Box>
                </HStack>
              </CardBody>
            </Card>
          ))
        ) : (
          <Text>No expenses found.</Text>
        )}
      </Box>
    </Box>
  );
};

export default ExpenseList;
