const Empdetails = require("../models/empDetails.model");
const logger = require("../middlewares/logger")

// to get all active employees from the database

exports.Active = async (req,res) => {
    try{
        const activeEmployees = await Empdetails.find({ isActive:true });
        const TotalactiveEmpLength = activeEmployees.length;
        res.status(200).json({
            status:200,
            message:"success",
            "Active Employee Count":TotalactiveEmpLength,
            "Active Employees":activeEmployees })
    }
    catch(err){
        logger.employeeLogger.error(err);
        res.status(500).json({ status:500, message:"failed", error: err.message || "internal server error"});
    }
}


// to get active any non active employees from url => status?isActive=true || status?isActive=1 || status?isActive=false || status?isActive=0

exports.isActive = (req,res) => {
    const isActive = req.query
    Empdetails.find(isActive)
            .then(data => {
            res.send({status:200, message:"Success", "Count of Employees":data.length, data:data});
        })
    .catch(err => {
        logger.employeeLogger.error(err);
            res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving the employee details"
        });
    });
}

