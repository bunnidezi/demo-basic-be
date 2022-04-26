const { throwException, sendResponse } = require("../helpers/util");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userController = {};
userController.createUserByEmailPassword = async (req, res, next) => {
  let { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throwException("Create Error: Missing info", 400);
    }
    const found = await User.findOne({ email });
    if (found) {
      throwException("User email already registered", 400);
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const success = await User.create({
      name,
      email,
      password,
    });
    return sendResponse(200, success, "Create User success", res, next);
  } catch (error) {
    next(error);
  }
};

userController.loginWithEmailPassword = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throwException("Create Error: Missing info", 400);
    }
    const found = await User.findOne({ email });
    if (!found) {
      throwException("User email is not registered", 400);
    }
    const isMatch = await bcrypt.compare(password, found.password);
    if (!isMatch) {
      throwException("Password is not match");
    }
    const accessToken = found.generateAccessToken();
    return sendResponse(200, accessToken, "Login sucessful", res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
