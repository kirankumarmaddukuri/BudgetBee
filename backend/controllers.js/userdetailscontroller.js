const User = require("../models/userdetailsmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

async function postUserDetails(req, res) {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      throw createError(409, "User already exists");
    }
    const newUser = new User({
      email: req.body.email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      return res
        .status(200)
        .json({ message: "User logged successfully", user: savedUser });
    } else {
      throw createError(500, "Error in storing user");
    }
  } catch (err) {
    if (err.status && err.message) {
      return res.status(err.status).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

async function getUserDetails(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      const isPasswordTrue = await bcrypt.compare(password, user.password);

      if (isPasswordTrue) {
        const payload = {
          userId: user._id,
        };
        const secretKey = process.env.JWT_SECRETKEY;
        const option = {};
        const accessKey = jwt.sign(payload, secretKey, option);
        res.status(200).json({ accessKey });
      } else {
        throw createError(409, "User details not valid");
      }
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    if (err.status && err.message) {
      return res.status(err.status).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}



module.exports = {
  postUserDetails,
  getUserDetails,
};
