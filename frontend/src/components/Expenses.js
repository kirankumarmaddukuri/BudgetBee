import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Expense from "./Expense";
import ExpensesChart from "./ExpensesChart";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Expenses = ({ expenses, setIsDeleteOperation, setExpenseToBeEdited, onClearExpenses }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to convert expenses to CSV and trigger download
  const downloadCSV = () => {
    if (!expenses || expenses.length === 0) return;
    const headers = ["Description", "Amount", "Category"];
    const rows = expenses.map(expense => [
      expense.description,
      expense.amount,
      expense.category,
    ]);
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\r\n";
    rows.forEach(rowArray => {
      csvContent += rowArray.join(",") + "\r\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter expenses based on search query (case-insensitive)
  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="expenses section-center section">
      <div className="expense-controls" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ flex: 1, textAlign: "left" }}>
          <button className="btn expense-control-btn" onClick={downloadCSV}>
            Download as CSV
          </button>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Link to="/add-expense" className="expense-control-btn btn">
            add expense
          </Link>
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          <button className="expense-control-btn btn" onClick={onClearExpenses}>
            clear expenses
          </button>
        </div>
      </div>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "50%", padding: "0.5rem", fontSize: "1rem" }}
        />
      </div>
      <div className="expenses-list">
        <div className="expense-headings">
          <h5>description</h5>
          <h5>amount</h5>
          <h5>category</h5>
          <h5>actions</h5>
        </div>
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => (
            <Expense
              key={expense._id}
              expense={expense}
              setExpenseToBeEdited={setExpenseToBeEdited}
              setIsDeleteOperation={setIsDeleteOperation}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "1rem" }}>No expenses found.</p>
        )}
      </div>
      <ExpensesChart expenses={filteredExpenses} />
    </section>
  );
};

export default Expenses;
