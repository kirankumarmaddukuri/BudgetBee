import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AddExpensePage from "./pages/AddExpensePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useSelector } from "react-redux";

const App = () => {
  let { isLoggedIn } = useSelector((state) => state.auth);
  
  const [expenses, setExpenses] = useState([]);
  const [expenseToBeEdited, setExpenseToBeEdited] = useState(null);
  const [isDeleteOperation, setIsDeleteOperation] = useState(false);

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? (
            <HomePage
              expenses={expenses}
              setExpenses={setExpenses}
              expenseToBeEdited={expenseToBeEdited}
              setExpenseToBeEdited={setExpenseToBeEdited}
              isDeleteOperation={isDeleteOperation}
              setIsDeleteOperation={setIsDeleteOperation}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route exact path="/register">
          {isLoggedIn ? <Redirect to="/" /> : <RegisterPage />}
        </Route>
        <Route exact path="/add-expense">
          {isLoggedIn ? (
            <AddExpensePage
              expenseToBeEdited={expenseToBeEdited}
              setExpenseToBeEdited={setExpenseToBeEdited}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
      {isLoggedIn && <Footer />}
    </>
  );
};

export default App;
