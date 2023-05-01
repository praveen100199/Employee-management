const Empdetails = require("../models/empDetails.model");
const logger = require("../middlewares/logger")

// Search employees based on name, id, position and skills
exports.SearchEmp = async (req, res) => {
    const ename = req.query.hasOwnProperty("empname");
    const eid = req.query.hasOwnProperty("empid");
    const empPosition = req.query.hasOwnProperty("position");
    const empSkills = req.query.hasOwnProperty("skills");


    // Search employee based on emp name
    if(ename){
        const empname = req.query.empname;
        var empnameCondition = empname ? { empname: { $regex: new RegExp(empname), $options: "i" } } : {};

        Empdetails.find(empnameCondition)
        .then(data => {
            if (data.length === 0) {
                res.send('No Employee found with this name'); // Handle empty res here
            }
            else{
                res.send(data);
            }
            
        })
        .catch(err => {
            logger.employeeLogger.error(err);
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving data"
            });
        });
    }

    // Search employee based on the emp id
    else if(eid){
        const empid = parseInt(req.query.empid);
        try {
            const emp = await Empdetails.findOne({ empid });
            if (!emp) {
            return res.status(404).json({ message: "Employee not found" });
            }
            res.json(emp);
        } catch (error) {
            logger.employeeLogger.error(err);
            res.status(500).json({ message: error.message });
        }
    }

    //Search employee based on the employee position
    else if(empPosition){
        const position = req.query.position;
        var positionCondition = position ? { position: { $regex: new RegExp(position), $options: "i" } } : {};

        Empdetails.find(positionCondition)
        .then(data => {
            if (data.length === 0) {
                res.send('No Positions found'); // Handle empty res here
            }
            else{
                res.send(data);
            }
        })
        .catch(err => {
            logger.employeeLogger.error(err);
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving data"
            });
        });
    }

    //search employee based on the employee skills
    else if(empSkills){
        const skills = req.query.skills;
        var skillsCondition = skills ? { skills: { $regex: new RegExp(skills), $options: "i" } } : {};

        Empdetails.find(skillsCondition)
        .then(data => {
            if (data.length === 0) {
                res.send('No Skills found'); // Handle empty res here
            }
            else{
                res.send(data);
            }
        })
        .catch(err => {
            logger.employeeLogger.error(err);
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving data"
            });
        });
    }

    else if(!ename && !eid && empSkills && empPosition){
        res.json({ message: "Please provide correct information" })
    }

};

// multiple search for employee
exports.multipleSearchOnEmployees = async (req,res, next) => {

    const skills = req.body.skills;
    const yearsofexperiance =req.body.yearsofexperiance;
    const skillsArray = Array.isArray(skills);

if(skillsArray && yearsofexperiance){
    const Condition1 =  { $and: [
        { skills: { $in: skills } },
        { yearsofexperiance: { $in: yearsofexperiance } }
    ]}
    try {
        const emp = await Empdetails.find(Condition1)
        if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
        }
        else{
            res.send(emp);
        }
    } catch (error) {
        logger.employeeLogger.error(err);
        res.status(500).json({ message: error.message });
    }
}


else if(!skillsArray && yearsofexperiance){
    const Condition2 =  { $and: [
        { skills: { $regex: skills, $options: 'i' } },
        { yearsofexperiance: { $in: yearsofexperiance } }
    ]}
    try {
        const emp = await Empdetails.find(Condition2)
        if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
        }
        else{
            res.send(emp);
        }
    } catch (error) {
        logger.employeeLogger.error(err);
        res.status(500).json({ message: error.message });
    }
}
};