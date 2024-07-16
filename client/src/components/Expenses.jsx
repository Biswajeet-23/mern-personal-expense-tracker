import { Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AddExpenses from "./AddExpenses";
import ExpenseList from "./ExpenseList";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.4:4000/users/expenses", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        console.error("failed to fetch data");
      }
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <Flex mt={10}>
      <AddExpenses fetchExpenses={fetchExpenses} />
      <ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} />
    </Flex>
  );
};

export default Expenses;
