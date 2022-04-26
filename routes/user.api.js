const express = require("express");
const {
  createUserByEmailPassword,
  loginWithEmailPassword,
} = require("../controllers/user.controllers");

const router = express.Router();

/**
 * @method: POST
 * @access: public
 * @description: Create user with email and password
 * @constructor: req.body { UserModel}
 */
router.post("/create", createUserByEmailPassword);

/**
 * @method: POST
 * @access: public
 * @description: Login a user with email and password
 * @constructor: req.body {email,password}
 */
router.post("/login", loginWithEmailPassword);

module.exports = router;
