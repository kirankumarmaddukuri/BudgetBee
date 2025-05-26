const Expenses = require("../models/expensedetailsmodel");
const jwt = require("jsonwebtoken");
const User = require("../models/userdetailsmodel");


async function postExpenseDetails(req, res) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
    const createdExpense = await new Expenses({
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
      userId: decodedToken.userId,
    });
    const storedExpenses = await createdExpense.save();
    if (storedExpenses) {
      const updateTotalExpenses = await User.findByIdAndUpdate(
        {
          _id: decodedToken.userId,
        },
        {
          $inc: { totalExpenses: req.body.amount },
        },
        {
          new: true,
        }
      );
    }
    res.status(200).json(createdExpense);
  } catch (err) {
    res.status(404).json({ error: "error in storing expenses" });
  }
}

async function getExpenses(req, res) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
    const userExpenses = await Expenses.find({
      userId: decodedToken.userId,
    });
    res.status(200).json(userExpenses);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function deleteExpense(req, res) {
  try {
    const id = req.params.id;
    const deletedObject = await Expenses.findByIdAndDelete({
      _id: id,
    });
    res.json("expense object deleted successfully");
  } catch (err) {
    res.json("error in deleteting the object");
  }
}


async function editExpense(req, res) {
  try {
    const id = req.params.id;
    const updatedData = {
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
    };

    const updatedExpense = await Expenses.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: "Error in updating expense" });
  }
}

async function deleteAllExpenses(req, res) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
    await Expenses.deleteMany({ userId: decodedToken.userId });
    await User.findByIdAndUpdate(
      { _id: decodedToken.userId },
      { totalExpenses: 0 }
    );
    res.status(200).json({ message: "All expenses deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting all expenses" });
  }
}

module.exports = {
  postExpenseDetails,
  getExpenses,
  deleteExpense,
  editExpense,
  deleteAllExpenses,
};


