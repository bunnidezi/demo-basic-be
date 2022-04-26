const express = require("express");

const router = express.Router();

// const studentRoutes = require("./student.api.js");
// router.use("/students", studentRoutes);

const userRoutes = require("./user.api.js");
router.use("/users", userRoutes);

module.exports = router;
