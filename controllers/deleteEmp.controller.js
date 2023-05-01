const Empdetails = require("../models/empDetails.model");
const logger = require("../middlewares/logger")

// Delete a user with the specified id in the request
exports.deleteEmp = async (req, res) => {
    await Empdetails.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
        res.status(404).send({
            message: `User not found.`
        });
        }
        else {
        res.send({
            message: "User deleted successfully!"
        });
        }
    }).catch(err => {
        logger.employeeLogger.error(err);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error',
            error: err.message
        });
    });
};