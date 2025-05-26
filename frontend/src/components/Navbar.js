import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logoutUser } from "../features/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    history.push("/login");
  };

  return (
    <nav>
      <div className="nav-center">
        <img src={logo} className="logo" alt="expensify logo" />
        <div className="btns">
        {location.pathname === "/add-expense" && (
          <Link to="/" className="btn see-expenses-btn">
            See Expenses
          </Link>
        )}
        <button className="btn see-expenses-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
    
      </div>
    </nav>
  );
};

export default Navbar;
