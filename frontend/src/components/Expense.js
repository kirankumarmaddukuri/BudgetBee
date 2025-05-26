import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import { formatAmount } from "../utils/helpers";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useSelector } from "react-redux";

const Expense = ({ expense, setExpenseToBeEdited, setIsDeleteOperation
}) => {
  const loggedInUserAccessKey = useSelector((state) => 
    state?.auth?.loggedInUserAccessKey
  );

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/deleteexpense/${id}`,
      );
        setIsDeleteOperation(true)
        toast.success("Expense Deleted!");
    } catch (error) {
      const errorMessage =
      error.response?.data?.error ||"Something went wrong";
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  const handleEdit = (expense) => {
    setExpenseToBeEdited(expense);
  };

  return (
    <article className="expense">
      <span>{expense.description}</span>
      <span>{formatAmount(expense.amount)}</span>
      <span>{expense.category}</span>
      <div className="expense-btns">
        <button
          type="button"
          className="expense-btn"
          onClick={() => handleDelete(expense._id)}
        >
          <AiFillDelete />
        </button>
        <Link
          to="/add-expense"
          className="expense-btn"
          onClick={() => {
            handleEdit(expense);
          }}
        >
          <BiSolidEdit />
        </Link>
      </div>
    </article>
  );
};

export default Expense;
