const userController = require('../controllers/users.controller');
const create = require('../controllers/createEmp.controller')

const express = require("express");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", userController.userProfile);

router.post('/createemp',create.createEmployee);
module.exports = router;

