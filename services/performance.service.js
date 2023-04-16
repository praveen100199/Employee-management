const performance =  require("../models/performance.model");

async function createPerformance(params, callback) {
    if (params.empid === undefined) {
        return callback({ message: "Emp id is Required"});
    }

    const user = new performance(params);
    user.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    }) ;
}

module.exports = {
    createPerformance
}