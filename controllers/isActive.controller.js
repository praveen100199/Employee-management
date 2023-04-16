const Empdetails = require("../models/empDetails.model");

exports.isActive = async (req,res) => {
    try{
        const activeEmployees = await Empdetails.find({ isActive:true });
        const TotalactiveEmpLength = activeEmployees.length;
        res.status(200).json( {status:200, message:"success", "Active Employee Count":TotalactiveEmpLength, "Active Employees":activeEmployees} )
    }
    catch(err){
        res.status(500).json({ status:500, message:"failed", error: err.message || "internal server error"});
    }
}