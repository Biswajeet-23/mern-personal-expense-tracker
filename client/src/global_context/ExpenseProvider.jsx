import React, { createContext, useState, useEffect, useCallback } from "react";

export const ExpensesContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [expenses]);

  useEffect(() => {
    fetchExpenses();
  }, [selectedCategory]);

  const fetchExpenses = useCallback(async () => {
    try {
      let url =
        "https://mern-personal-expense-tracker-backend.onrender.com/users/expenses";
      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }
      const response = await fetch(url, {
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
  }, [selectedCategory]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        "https://mern-personal-expense-tracker-backend.onrender.com/users/categories",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error(response.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        categories,
        selectedCategory,
        setExpenses,
        setSelectedCategory,
        fetchExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
