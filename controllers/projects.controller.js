const projectService = require('../services/projects.services');
const projectsModel = require("../models/projects.model");
const Empdetails = require("../models/empDetails.model");


// Define a function to check if an employee exists
async function doesEmployeeExist(employeeId) {
    const employee = await Empdetails.findOne({ empid: employeeId }).exec();
    return !!employee; // double negation to convert the result to a boolean value
}


// create projects
exports.createProjects = async (req,res, next) => {

  // Call the function with an employee ID to check if it exists
const employeeExists = await doesEmployeeExist(req.body.empid);

    if(employeeExists){
        projectService.createProjects(req.body, (error, result) => {
            if(error) {
                return res.json({ message:"Projects with this id already exsists in data base" });
            }
            return res.status(200).send({
                status: 200,
                message: "Success",
                data: result,
            });
        });
    }
    else{
        res.json({ message: "Create Employee before inserting the projects" })
    }
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
    const techstack = req.query.hasOwnProperty("techstack");

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


    // Search projects based on tech stack
    if(techstack){
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

    else{
        res.json({message: "Enter correct input to display the results."})
    }
}


// multiple search on projects
exports.multipleSearch = async (req,res, next) => {

    const projects = req.body.projects;
    const techstack =req.body.techstack;
    const projectsArray = Array.isArray(projects);
    const techstackArray = Array.isArray(techstack); 

if(projectsArray && techstackArray){
    const Condition1 =  { $and: [
        { projects: { $in: projects } },
        { techstack: { $in: techstack } }
    ]}
    try {
        const emp = await projectsModel.find(Condition1)
        if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
        }
        else{
            res.send(emp);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


else if(!projectsArray && !techstackArray){
    const Condition2 =  { $and: [
        { projects: { $regex: projects, $options: 'i' } },
        { techstack: { $regex: techstack, $options: 'i' } }
    ]}
    try {
        const emp = await projectsModel.find(Condition2)
        if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
        }
        else{
            res.send(emp);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

else if(projectsArray && !techstackArray){
    const Condition3 =  { $and: [
        { projects: { $in: projects } },
        { techstack: { $regex: techstack, $options: 'i' } }
    ]}
    try {
        const emp = await projectsModel.find(Condition3)
        if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
        }
        else{
            res.send(emp);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

else if(!projectsArray || techstackArray){
    const Condition4 =  { $and: [
        { projects: { $regex: projects, $options: 'i' } },
        { techstack: { $in: techstack } }
    ]}
    try {
        const emp = await projectsModel.find(Condition4)
        if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
        }
        else{
            res.send(emp);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
};