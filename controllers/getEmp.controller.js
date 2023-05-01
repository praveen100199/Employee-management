const Empdetails = require("../models/empDetails.model");
const logger = require("../middlewares/logger")

// get all employees
exports.getEmployees = async (req,res) => {
        try {
            const user = await Empdetails.find();
            res.status(200).json({ status:200, message:"success", employees:user });
        } 
        catch(err) {
            logger.employeeLogger.error(err);
            res.status(404).json({status:404, message:"failed", error: error.message});
        }
};

//get employee by id
exports.getEmployeeById = async (req, res) => {
    
    try {
        const user = await Empdetails.findById(req.params.id);
        if(user == null){
            res.json({ message: "User does not exists" })
        }
        else{
            res.status(200).json({ status:200, message:"success", employees:user });
        }
    } catch(error) {
        logger.employeeLogger.error(err);
        res.status(404).json({ status:404, message:"failed", error: error.message});
    }
};
