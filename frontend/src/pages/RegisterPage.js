import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { CgMail } from "react-icons/cg";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdAppRegistration } from "react-icons/md";
import { toast } from "react-toastify";
import expenseTracker from "../assets/expense-tracker.png";
import Loader from "../components/Loader";
import { validateForm } from "../utils/helpers";
import axios from "axios";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      validateForm(setErrors, formData, {
        email: true,
        password: true,
        confirmPassword: true,
        description: false,
        amount: false,
        category: false,
      })
    ) {
      setIsLoading(true);
      try {
        await axios.post(
          'http://localhost:3002/signup',
          {
            email: formData.email,
            password: formData.password,
          },
         );
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });
        toast.success("Registered successfully!");
        history.replace("/login");
      } catch (error) {
        console.log(error);
        
        const errorMessage =
        error.response?.data?.error ||"Something went wrong";
        toast.error(errorMessage);
        console.log(errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please fill out all fields correctly");
    }
  };
  return (
    <main className="register">
      <form className="form" noValidate>
        <h2>register</h2>
        <p>welcome! please enter your details.</p>
      
        <div className={`input-box ${errors.email && "error-input-box"}`}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Enter Email"
            autoFocus
          />
          <span>
            <CgMail />
          </span>
        </div>
        {errors.email && <span className="error-msg">{errors.email}</span>}
        <div className={`input-box ${errors.password && "error-input-box"}`}>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Enter Password"
            onPaste={(e) => e.preventDefault()}
          />
          <button
            type="button"
            onClick={handlePasswordVisibility}
            className="pwd-icon"
          >
            {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
        {errors.password && (
          <span className="error-msg">{errors.password}</span>
        )}

        <div
          className={`input-box ${errors.confirmPassword && "error-input-box"}`}
        >
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Re-enter Password"
            onPaste={(e) => e.preventDefault()}
          />
          <button
            type="button"
            onClick={handleConfirmPasswordVisibility}
            className="pwd-icon"
          >
            {isConfirmPasswordVisible ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="error-msg">{errors.confirmPassword}</span>
        )}

        <button
          type="submit"
          onClick={handleRegister}
          className={`btn form-btn ${isLoading && "btn-disabled"}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              register <MdAppRegistration />
            </>
          )}
        </button>

        <p>
          already have an account?{" "}
          <Link
            to="/login"
            className={isLoading && "btn-disabled"}
            disabled={isLoading}
          >
            login
          </Link>
        </p>
      </form>
      <img src={expenseTracker} alt="expense tracker" />
    </main>
  );
};
export default RegisterPage;