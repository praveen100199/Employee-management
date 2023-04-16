const createEmpService = require('../services/createEmp.services');

exports.createEmployee = (req,res, next) => {
    createEmpService.createEmployee(req.body, (error, result) => {
        if(error) {
            return next(error);
        }
        return res.status(200).send({
            status: 200,
            message: "Success",
            data: result,
        });
    });
};