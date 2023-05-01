const createEmpService = require('../services/createEmp.services');
const logger = require("../middlewares/logger")


exports.createEmployee = (req,res, next) => {
    createEmpService.createEmployee(req.body, (error, result) => {
        if(error) {
            logger.employeeLogger.error(error);
            return next(error);
        }
        return res.status(200).send({
            status: 200,
            message: "Success",
            data: result,
        });
    });
};