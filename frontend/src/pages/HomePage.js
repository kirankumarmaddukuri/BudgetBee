import React, { useEffect, useState, useCallback } from "react";
import Expenses from "../components/Expenses";
import NoExpenses from "../components/NoExpenses";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const HomePage = ({
  expenses,
  setExpenses,
  expenseToBeEdited,
  setExpenseToBeEdited,
  isDeleteOperation, 
  setIsDeleteOperation
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const loggedInUserAccessKey = useSelector((state) => state?.auth?.loggedInUserAccessKey);

  const fetchAllTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3002/userexpenses`,
        {
          headers: {
            Authorization: `Bearer ${loggedInUserAccessKey}`,
          },
        }
      );
      setExpenses(response?.data);
      
    } catch (error) {
      const errorMessage =
    error.response?.data?.error ||"Something went wrong";
      toast.error(errorMessage);
      console.log(errorMessage);
    } finally {
      setIsDeleteOperation(false)
      setIsLoading(false);
    }
  }, [loggedInUserAccessKey, setExpenses, setIsDeleteOperation]);

  useEffect(() => {
    fetchAllTransactions();
  }, [fetchAllTransactions, isDeleteOperation]);

  // Callback to clear all expenses
  const clearAllExpenses = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.delete(
        `http://localhost:3002/userexpenses`,
        {
          headers: {
            Authorization: `Bearer ${loggedInUserAccessKey}`,
          },
        }
      );
      setExpenses([]);
      toast.success("All expenses cleared successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to clear expenses";
      toast.error(errorMessage);
      console.log(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [loggedInUserAccessKey, setExpenses]);

  return (
    <main className={isLoading && "loader-main"}>
      {isLoading ? (
        <Loader/>
      ) : expenses.length > 0 ? (
        <Expenses
          expenses={expenses}
          setIsDeleteOperation={setIsDeleteOperation}
          setExpenseToBeEdited={setExpenseToBeEdited}
          onClearExpenses={clearAllExpenses}
        />
      ) : (
        <NoExpenses />
      )}
    </main>
  );
};

export default HomePage;
