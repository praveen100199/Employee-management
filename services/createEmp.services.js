const Empdetails = require("../models/empDetails.model");

async function createEmployee(params, callback) {
    if (params.empid === undefined) {
        return callback({message: "Employee Id is Required"});
    }

    const user = new Empdetails(params);
    user.save()
    .then((response) => {
        return callback(null,response);
    })
    .catch((error) => {
        return callback(error);
    })
}

module.exports = {
    createEmployee
}