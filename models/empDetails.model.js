const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const createEmp = mongoose.Schema({
    
    empid: {
        type: String,
        required: true,
        unique: true,
    },
    empname: {
        type: String,
        required: true,
    },
    dateofjoining: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    dateofbirth: {
        type: Date,
        required: false,
    },
    position: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: false,
    },
    certificates: {
        type: String,
        required: false,
    },
    yearsofexperiance: {
        type: Date,
        required: false,
    },
})

const Empdetails= mongoose.model('createEmp',createEmp);
module.exports = Empdetails;

createEmp.plugin(uniqueValidator, {message: "Employee Id already exist in database"});
