import React, { useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { RiPencilLine } from "react-icons/ri";
import { FaUtensils, FaBus, FaHeartbeat, FaHome, FaFilm, FaBook, FaEllipsisH } from "react-icons/fa";
import { toast } from "react-toastify";
import { validateForm } from "../utils/helpers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useSelector } from "react-redux";

const iconOptions = {
  food: <FaUtensils />,
  transportation: <FaBus />,
  health: <FaHeartbeat />,
  rent: <FaHome />,
  entertainment: <FaFilm />,
  education: <FaBook />,
  others: <FaEllipsisH />,
};

const AddExpensePage = ({
  expenseToBeEdited,
  setExpenseToBeEdited,
}) => {
  const history = useHistory();
  const expense = expenseToBeEdited;
  const loggedInUserAccessKey = useSelector((state) => state?.auth?.loggedInUserAccessKey);
  const [errors, setErrors] = useState({});
  let [formData, setFormData] = useState({
    description: expense ? expense.description : "",
    amount: expense ? expense.amount : "",
    category: expense ? expense.category : "",
    categoryIcon: expense ? expense.categoryIcon : "",
  });

  const handleCancel = () => {
    setExpenseToBeEdited(null);
    setFormData({
      description: "",
      amount: "",
      category: "",
      categoryIcon: "",
    });
    history.push("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category: category,
      categoryIcon: category, // use category name as icon key
    }));
    setErrors((prev) => ({ ...prev, category: "" }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (
      validateForm(setErrors, formData, {
        description: true,
        amount: true,
        category: true,
      })
    ) {
      if (expense) {
        try {
          const response = await axios.put(
            `http://localhost:3002/editexpense/${expense._id}`,
            formData,
            {
            headers: {
                Authorization: `Bearer ${loggedInUserAccessKey}`,
              },
            }
          );
            toast.success("Expense updated.");
            handleCancel();
        
        } catch (error) {
          const errorMessage =
          error.response?.data?.error ||"Something went wrong";
          toast.error(errorMessage);
          console.log(errorMessage);
        }
      } else {
        try {
          const response = await axios.post(
            `http://localhost:3002/userexpense`,
            formData,
            {
            headers: {
                Authorization: `Bearer ${loggedInUserAccessKey}`,
              },
            }
          );
          toast.success("Expense added.");
          handleCancel();
      
        } catch (error) {
          const errorMessage =
          error.response?.data?.error ||"Something went wrong";
          toast.error(errorMessage);
          console.log(errorMessage);
        }
      }
    } else {
      toast.error("Please fill out all fields correctly");
    }
  };
  return (
    <div className="add-expense">
      <form noValidate>
        <h3>{expense ? "Edit Expense" : "Add Expense"}</h3>
        <div className={`input-box ${errors.name && "error-input-box"}`}>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter Expense Description"
          />
          <span>
            <RiPencilLine />
          </span>
        </div>
        {errors.description && (
          <span className="error-msg">{errors.description}</span>
        )}
        <div className={`input-box ${errors.amount && "error-input-box"}`}>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter Expense Amount"
          />
          <span>
            <MdOutlineCurrencyRupee />
          </span>
        </div>
        {errors.amount && <span className="error-msg">{errors.amount}</span>}
        <div className={`input-box ${errors.category && "error-input-box"}`}>
          <select
            name="category"
            autoComplete="off"
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="health">Health</option>
            <option value="rent">Rent</option>
            <option value="entertainment">Entertainment</option>
            <option value="education">Education</option>
            <option value="others">Others</option>
          </select>
          <span style={{ marginLeft: "10px" }}>
            {formData.categoryIcon && iconOptions[formData.categoryIcon]}
          </span>
        </div>
        {errors.category && (
          <span className="error-msg">{errors.category}</span>
        )}
        <div className="cancel-and-add-btns">
          <button
            type="button"
            className="btn cancel-btn"
            onClick={handleCancel}
          >
            cancel
          </button>
          <button
            type="submit"
            onClick={handleAddExpense}
            className="btn add-btn"
          >
            {expense ? "update expense" : "add expense"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddExpensePage;
