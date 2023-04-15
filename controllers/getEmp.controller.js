const Empdetails = require("../models/empDetails.model");

exports.getEmployees = async (req,res) => {
        try {
            const user = await Empdetails.find();
            res.status(200).json(user);
        } 
        catch(err) {
            res.status(404).json({message: err.message});
        }
};
