const projects =  require("../models/projects.model");

async function createProjects(params, callback) {
    if (params.empid === undefined) {
        return callback({ message: "Emp id is Required"});
    }

    const user = new projects(params);
    user.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    }) ;
}

module.exports = {
    createProjects
}