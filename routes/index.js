const express = require("express");
const sendResponse = require("../helpers/sendReponse.js");

const router = express.Router();

/* GET home page. */

router.get("/", function (req, res, next) {
  return sendResponse(200, {}, "home", res, next);
});
router.get("/haha", function (req, res, next) {
  return sendResponse(200, {}, "haha", res, next);
});

const studentRoutes = require("./student.api.js");
router.use("/students", studentRoutes);

// const userRoutes = require("./user.api.js");
// router.use("/users", userRoutes);

module.exports = router;
