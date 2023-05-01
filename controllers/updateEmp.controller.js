const Empdetails = require("../models/empDetails.model");
const logger = require("../middlewares/logger")


// Update a user by the id in the request
exports.updateEmp = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await Empdetails.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        logger.employeeLogger.error(err);
        res.status(500).send({
            message: err.message
        });
    });
};
