export const formatAmount = (price) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return formatter.format(price);
};

export const validateForm = (setErrors, formData, formFields) => {
  let isValid = true;
  const formErrors = {};

  if (formFields.email) {
    if (!formData.email.trim()) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      formErrors.email = "Invalid email format";
      isValid = false;
    }
  }

  if (formFields.password) {
    const hasSixCharacters = formData.password.length >= 6;
    const hasLowercaseLetter = /[a-z]/.test(formData.password);
    const hasUppercaseLetter = /[A-Z]/.test(formData.password);
    const hasDigit = /\d/.test(formData.password);
    const hasSpecialCharacter = /[!@#$%^&*()\-_=+~`[\]{}|:;"'<>,.?/]/.test(
      formData.password
    );
    if (!formData.password.trim()) {
      formErrors.password = "Password is required.";
      isValid = false;
    } else if (
      !hasSixCharacters ||
      !hasLowercaseLetter ||
      !hasUppercaseLetter ||
      !hasDigit ||
      !hasSpecialCharacter
    ) {
      let errorMessage = "Password must contain ";
      let missing = [];
      if (!hasSixCharacters) missing.push("at least 6 characters");
      if (!hasLowercaseLetter) missing.push("at least 1 lowercase letter");
      if (!hasUppercaseLetter) missing.push("at least 1 uppercase letter");
      if (!hasDigit) missing.push("at least 1 digit");
      if (!hasSpecialCharacter) missing.push("at least 1 special character");
      errorMessage += missing.join(", ") + ".";
      formErrors.password = errorMessage;
      isValid = false;
    } else if (formData.password.length > 128) {
      formErrors.password = "Password length cannot exceed 128 characters.";
      isValid = false;
    }
  }

  if (formFields.confirmPassword) {
    if (!formData.confirmPassword.trim()) {
      formErrors.confirmPassword = "Confirm password is required.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }
  }

  if (formFields.description) {
    if (!formData.description.trim()) {
      formErrors.description = "Expense description is required.";
      isValid = false;
    } else if (formData.description.length < 3) {
      formErrors.description =
        "Expense description must be at least 3 characters.";
      isValid = false;
    } else if (formData.description.length > 100) {
      formErrors.description =
        "Expense description cannot be more than 100 characters long.";
      isValid = false;
    }
  }

  if (formFields.amount) {
    if (!formData.amount.trim()) {
      formErrors.amount = "Expense amount is required.";
      isValid = false;
    } else if (!/^\d*\.?\d+$/.test(formData.amount)) {
      formErrors.amount = "Expense amount must be a valid number.";
      isValid = false;
    } else if (parseFloat(formData.amount) <= 0) {
      formErrors.amount = "Expense amount must be greater than 0.";
      isValid = false;
    }
  }

  if (formFields.category) {
    if (!formData.category) {
      formErrors.category = "Please select a category.";
      isValid = false;
    }
  }

  setErrors(formErrors);
  return isValid;
};