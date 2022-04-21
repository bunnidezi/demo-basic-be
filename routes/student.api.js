const express = require("express");
const router = express.Router();
const fs = require("fs");
const { sendResponse, generateRandomHexString } = require("../helpers/util");
/* GET students. */

const loadData = () => {
  //could be optimised
  let db = fs.readFileSync("db.json", "utf8");
  return JSON.parse(db);
};

//pagination
//limit number of data
//page=x => ....->xxx
router.get("/", function (req, res, next) {
  //load
  let db = loadData();
  const limit = req.query.limit || 10;
  const page = req.query.page || 3;
  const offset = limit * (page - 1);
  //filter by limit
  db = db.slice(offset, limit * page);

  return sendResponse(
    200,
    { data: db, number: db.length || 0 },
    "Student list",
    res,
    next
  );
});

router.post("/", function (req, res, next) {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password || !age) {
      const error = new Error("Missing info");
      error.statusCode = 400;
      throw error;
    }
    let dataToSave = loadData();
    const found = dataToSave.find((el) => el.email === email);
    if (found) {
      const error = new Error("User is already existed");
      error.statusCode = 400;
      throw error;
    }

    const studentObj = {
      id: generateRandomHexString(24),
      name,
      email,
      password,
      __v: 0,
      age: parseInt(age),
    };

    dataToSave.push(studentObj);
    dataToSave = JSON.stringify(dataToSave);

    fs.writeFileSync("db.json", dataToSave);

    return sendResponse(200, studentObj, "create student success", res, next);
  } catch (error) {
    next(error);
  }
});

router.put("/", function (req, res, next) {
  const { email, password, newPassword } = req.body;
  try {
    if (!email || !password || !newPassword) {
      const error = new Error("Missing info");
      error.statusCode = 400;
      throw error;
    }
    if (password === newPassword) {
      const error = new Error("New password should be different");
      error.statusCode = 400;
      throw error;
    }
    const db = loadData();
    const found = db.find((el) => el.email === email);
    if (!found) {
      const error = new Error("User is not found");
      error.statusCode = 400;
      throw error;
    }
    if (found.password !== password) {
      const error = new Error("Password not match");
      error.statusCode = 400;
      throw error;
    }
    let dataToSave = db.map((e) => {
      if (e.email === email) {
        e.password = newPassword;
      }
      return e;
    });
    dataToSave = JSON.stringify(dataToSave);
    fs.writeFileSync("db.json", dataToSave);
    return sendResponse(200, {}, "update success", res, next);
  } catch (error) {
    next(error);
  }
});

/* GET students. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  //tim x trong array
  let message = `Get single student by id ${id}`;
  let selectedStudent;
  try {
    const db = loadData();
    selectedStudent = db.find((student) => student.id === id);
    if (!selectedStudent) {
      message = "Student with given id is not found";
    }
  } catch (error) {
    console.log(error);
  }
  return sendResponse(200, selectedStudent || {}, message, res, next);
});

module.exports = router;
