const { throwException, sendResponse } = require("../helpers/util");
const User = require("../model/User");
const bcrypt = require("bcryptjs");

const userController = {};
userController.createUserByEmailPassword = async (req, res, next) => {
  let { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throwException("Create Error: Missing info", 400);
    }
    const found = await User.findOne({ email });
    if (found) {
      if (found.isDeleted === true) {
        throwException("Account has been deleted do you want to recover?", 400);
      }
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

userController.getAllUsersList = async (req, res, next) => {
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = limit * (page - 1);

  const filterCondition = { isDeleted: false };

  const total = await User.countDocuments(filterCondition);
  const totalPages = Math.ceil(total / limit);

  try {
    const users = await User.find(filterCondition).skip(offset).limit(limit);
    sendResponse(
      200,
      { users, total, totalPages },
      "Get all users success",
      res,
      next
    );
  } catch (err) {
    next(err);
  }
};

userController.getSingleUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, isDeleted: false });
    if (!user) {
      throwException(`User with ${id} not found`, 400);
    }
    sendResponse(200, user, "Get single user success", res, next);
  } catch (error) {
    next(error);
  }
};

userController.deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { isDeleted: true });
    sendResponse(200, id, "Delete single user success", res, next);
  } catch (error) {
    next(error);
  }
};

userController.deleteOwnerAccount = async (req, res, next) => {
  try {
    const { userId } = req;
    await User.findByIdAndUpdate(userId, { isDeleted: true });
    sendResponse(200, userId, "Delete single user success", res, next);
  } catch (error) {
    next(error);
  }
};

userController.updateOwnerAccount = async (req, res, next) => {
  try {
    const { userId } = req;
    const { name } = req.body;
    if (!name) {
      throwException("missing name", 400);
    }
    const data = await User.findByIdAndUpdate(userId, { name }, { new: true });

    sendResponse(200, data, "update user success", res, next);
  } catch (error) {
    next(error);
  }
};
module.exports = userController;
