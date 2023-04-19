const userController = require('../controllers/users.controller');
const create = require('../controllers/createEmp.controller');
const getEmp = require('../controllers/getEmp.controller');
const updateEmployees = require('../controllers/updateEmp.controller');
const delEmp = require("../controllers/deleteEmp.controller");
const search = require("../controllers/searchEmp.controller");
const Status = require("../controllers/isActive.controller");
const performance = require('../controllers/performance.controller');
const ratings = require('../controllers/ratings.controller');
const projects = require('../controllers/projects.controller');


const express = require("express");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", userController.userProfile);

router.post('/createemp',create.createEmployee);
router.get('/getallemp',getEmp.getEmployees);
router.get('/getemp/:id',getEmp.getEmployeeById);
router.put('/updateemp/:id',updateEmployees.updateEmp);
router.delete('/delemp/:id',delEmp.deleteEmp);

router.get('/active', Status.Active); // to get all active employees
router.get('/status', Status.isActive);

router.get('/searchemp/',search.SearchEmp);

router.post('/performance',performance.createPerformance);
router.get('/ratings',ratings.getRatings);
router.get('/goodratings',ratings.getRatingMoreThanThree);
router.get('/badratings',ratings.getRatingLessThanThree);

router.post('/createprojects',projects.createProjects);
router.get('/searchprojects', projects.SearchProjects);
router.get('/getprojects',projects.getAllProjects);
router.post('/multiplesearch',projects.multipleSearch);

module.exports = router;

