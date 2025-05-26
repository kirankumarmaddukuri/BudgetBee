const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const postExpensesRouter = require("./router/expensedetailsrouter");
const postRouter = require("./router/userdetailsrouter");
const { connectDB } = require("./db/database");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); 

// Routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(postRouter);
app.use(postExpensesRouter);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
});
