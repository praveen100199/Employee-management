const userController = require('../controllers/users.controller');
const create = require('../controllers/createEmp.controller');
const getEmp = require('../controllers/getEmp.controller');
const updateEmployees = require('../controllers/updateEmp.controller')
const delEmp = require("../controllers/deleteEmp.controller");
const express = require("express");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", userController.userProfile);

router.post('/createemp',create.createEmployee);

router.get('/getallemp',getEmp.getEmployees);
router.get('/getemp/:id',getEmp.getEmployeeById);
router.put('/updateemp/:id',updateEmployees.updateEmp);
router.delete('/delemp/:id',delEmp.deleteEmp)
module.exports = router;

