const express = require("express");
const { sendResponse } = require("../helpers/util.js");

const router = express.Router();

/* GET home page. */

router.get("/", function (req, res, next) {
  return sendResponse(200, {}, "Home", res, next);
});

const studentRoutes = require("./student.api.js");
router.use("/students", studentRoutes);

// const userRoutes = require("./user.api.js");
// router.use("/users", userRoutes);

module.exports = router;
