const express = require("express");
const {
  postExpenseDetails,
  getExpenses,
  deleteExpense,
  editExpense,
  deleteAllExpenses,
} = require("../controllers.js/expensedetailscontroller");

const postExpensesRouter = express.Router();
postExpensesRouter.post("/userexpense", postExpenseDetails);
postExpensesRouter.get("/userexpenses", getExpenses);
postExpensesRouter.delete("/deleteexpense/:id", deleteExpense);
postExpensesRouter.delete("/userexpenses", deleteAllExpenses);
postExpensesRouter.put("/editexpense/:id", editExpense); 

module.exports = postExpensesRouter;
