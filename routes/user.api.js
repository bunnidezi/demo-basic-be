const express = require("express");
const {
  createUserByEmailPassword,
  loginWithEmailPassword,
  getAllUsersList,
  getSingleUserById,
  deleteUserById,
} = require("../controllers/user.controllers");

const router = express.Router();

/**
 * @method: GET
 * @access: public
 * @description: Request for a list of all users
 * @constructor:
 */
router.get("/", getAllUsersList);
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
/**
 * @method: GET
 * @access: public
 * @description: Request for a user info with user id
 * @constructor: param userId
 */
router.get("/:id", getSingleUserById);
/**
 * @method: GET
 * @access: public
 * @description: Request for a user info with user id
 * @constructor: param userId
 */
router.delete("/:id", deleteUserById);

module.exports = router;
