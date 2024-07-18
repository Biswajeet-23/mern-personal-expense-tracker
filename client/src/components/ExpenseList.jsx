import {
  Box,
  Card,
  CardBody,
  CardHeader,
  FormLabel,
  HStack,
  Stack,
  Text,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CurrencyRupee } from "@styled-icons/heroicons-solid/CurrencyRupee";
import { ChatFill } from "@styled-icons/bootstrap/ChatFill";
import { Category } from "@styled-icons/boxicons-solid/Category";
import { CalendarDateFill } from "@styled-icons/bootstrap/CalendarDateFill";
import { Delete } from "@styled-icons/material-rounded/Delete";
import { Edit } from "@styled-icons/boxicons-solid/Edit";

const ExpenseList = ({ expenses, fetchExpenses, onEdit }) => {
  const toast = useToast();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const cancelRef = useRef();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDeleteClick = (id) => {
    setSelectedExpenseId(id);
    setIsAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.4:4000/users/expenses/${selectedExpenseId}`,
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
    } finally {
      setIsAlertOpen(false);
      setSelectedExpenseId(null);
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
                      onClick={() => handleDeleteClick(expense._id)}
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

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Expense
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this expense? You can't undo this
              action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ExpenseList;
