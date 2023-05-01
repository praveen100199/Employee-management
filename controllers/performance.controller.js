const performanceService = require('../services/performance.service');
const Empdetails = require("../models/empDetails.model");
const logger = require("../middlewares/logger")

// Define a function to check if an employee exists
async function doesEmployeeExist(employeeId) {
    const employee = await Empdetails.findOne({ empid: employeeId }).exec();
    return !!employee; // double negation to convert the result to a boolean value
}

exports.createPerformance = async (req,res, next) => {

    // Call the function with an employee ID to check if it exists
    const employeeExists = await doesEmployeeExist(req.body.empid);

    if(employeeExists){
    performanceService.createPerformance(req.body, (error, result) => {
        if(error) {
            logger.employeeLogger.error(error);
            return res.json({ message:"Performance with this id already exsists in data base" });
        }
            return res.status(200).send({
                status: 200,
                message: "Success",
                data: result,
            });
        });
    }

    else{
        res.json({ message: "Create Employee before inserting the ratings" })
    }
};