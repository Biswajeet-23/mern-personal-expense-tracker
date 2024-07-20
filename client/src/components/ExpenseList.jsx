import {
  Box,
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
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { CurrencyRupee } from "@styled-icons/heroicons-solid/CurrencyRupee";
import { ChatFill } from "@styled-icons/bootstrap/ChatFill";
import { Category } from "@styled-icons/boxicons-solid/Category";
import { CalendarDateFill } from "@styled-icons/bootstrap/CalendarDateFill";
import { Delete } from "@styled-icons/material-rounded/Delete";
import { Edit } from "@styled-icons/boxicons-solid/Edit";
import { BASE_URL } from "../utils/config";

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
        `${BASE_URL}/users/expenses/${selectedExpenseId}`,
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

  // Define color values based on color mode
  const bgColor = useColorModeValue("#e0e0e0", "#1a1a1a");
  const shadowLight = useColorModeValue("#ffffff", "#3b3b3b");
  const shadowDark = useColorModeValue("#b0b0b0", "#0d0d0d");
  const deleteBtnColor = useColorModeValue("red", "#e8524d");
  const editBtnColor = useColorModeValue("#bfb119", "#ede268");

  const neumorphismStyle = {
    backgroundColor: bgColor,
    borderRadius: "15px",
    borderWidth: "2px",
    boxShadow: `4px 4px 8px ${shadowDark}, -4px -4px 8px ${shadowLight}`,
  };

  return (
    <Box ml={15}>
      <FormLabel>Expenses</FormLabel>
      <Box
        maxHeight="500px"
        overflowY="auto"
        p={2}
        borderRadius="md"
        style={neumorphismStyle}
      >
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <Box
              key={expense._id}
              p={4}
              mb={4}
              width={500}
              boxShadow={"lg"}
              borderWidth="1px"
              style={neumorphismStyle}
            >
              <HStack justifyContent="space-between">
                <HStack spacing={1} flex={1}>
                  <Box>
                    <Category size={25} />
                  </Box>
                  <Text>{expense.category}</Text>
                </HStack>
                <HStack justifyContent="space-between" flex={2}>
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
                  <HStack>
                    <Box cursor={"pointer"}>
                      <Delete
                        size={30}
                        onClick={() => handleDeleteClick(expense._id)}
                        color={deleteBtnColor}
                      />
                    </Box>
                    <Box cursor={"pointer"}>
                      <Edit
                        size={30}
                        color={editBtnColor}
                        onClick={() => onEdit(expense)}
                      />
                    </Box>
                  </HStack>
                </HStack>
              </HStack>
            </Box>
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
