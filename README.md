# BudgetBee Website

## Project Description
BudgetBee is a full-stack expense tracker web application designed to help users manage their personal expenses efficiently. It features user authentication, allowing users to securely register, log in, and manage their expenses with ease. The app provides a clean, responsive, and user-friendly interface for adding, editing, viewing, and deleting expenses categorized with intuitive icons.

## Features
- User registration and login with secure authentication
- Add new expenses with description, amount, and category
- Edit and delete existing expenses
- View a list of all expenses with category icons
- Clear all expenses at once
- Responsive and intuitive UI with loading states and error notifications
- Form validation and user feedback with toast notifications

## Technology Stack
- **Frontend:** React, Redux, React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB 
- **Other Libraries:** React Icons, React Toastify

## Clone Repository
To clone this repository, run the following command:
```bash
git clone https://github.com/kirankumarmaddukuri/BudgetBee.git
```

## Installation

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and set the following environment variables:
   ```
   PORT=3002
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```bash
   node app.js
   ```
   The backend server will run on the port specified in `.env` (default 3002).

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000` by default.

## Usage
1. Open the frontend URL in your browser (usually `http://localhost:3000`).
2. Register a new user account or log in with existing credentials.
3. Add new expenses by providing a description, amount, and selecting a category.
4. View your list of expenses on the home page.
5. Edit or delete individual expenses as needed.
6. Use the option to clear all expenses if desired.
7. Log out when finished.

## Folder Structure

```
/backend
  ├── app.js                  # Backend server setup and route registration
  ├── controllers.js/         # Controllers for handling business logic
  ├── db/                     # Database connection setup
  ├── models/                 # Data models for users and expenses
  ├── router/                 # API route definitions for users and expenses
  ├── package.json            # Backend dependencies and scripts

/frontend
  ├── public/                 # Static files and index.html
  ├── src/
      ├── components/         # Reusable React components (Navbar, Footer, Expenses, etc.)
      ├── features/           # Redux slices (e.g., authSlice)
      ├── pages/              # React pages (HomePage, LoginPage, RegisterPage, AddExpensePage)
      ├── utils/              # Utility functions and constants
      ├── App.js              # Main React app component with routing
      ├── index.js            # React app entry point
  ├── package.json            # Frontend dependencies and scripts
```


