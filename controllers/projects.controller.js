const projectService = require('../services/projects.services');
const projectsModel = require("../models/projects.model");

// create projects
exports.createProjects = (req,res, next) => {
    projectService.createProjects(req.body, (error, result) => {
        if(error) {
            return next(error);
        }
        return res.status(200).send({
            status: 200,
            message: "Success",
            data: result,
        });
    });
};

// get all projects
exports.getAllProjects = async (req,res) => {
    try {
        const user = await projectsModel.find();
        res.status(200).json({ status:200, message:"success", employees:user });
    } 
    catch(err) {
        res.status(404).json({status:404, message:"failed", error: error.message});
    }
};



exports.SearchProjects = async (req, res) => {

    // Search projects based on project name
    const projects = req.query.hasOwnProperty("projects");
    const empid = req.query.hasOwnProperty("empid");

    if(projects){
        const projects = req.query.projects;
        var projectsCondition = projects ? { projects: { $regex: new RegExp(projects), $options: "i" } } : {};

        projectsModel.find(projectsCondition)
        .then(data => {
            if (data.length === 0) {
                res.send('No Employee found with this name'); // Handle empty res here
            }
            else{
                res.send(data);
            }
            
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving data"
            });
        });
    }


    // Search employee based on the emp id
    if(empid){
        const empid = parseInt(req.query.empid);
        try {
            const emp = await projectsModel.findOne({ empid });
            if (!emp) {
            return res.status(404).json({ message: "Employee not found" });
            }
            res.json(emp);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

