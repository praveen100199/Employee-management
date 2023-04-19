const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const projects = mongoose.Schema([{
    
    empid: {
        type: Number,
        required: true,
        unique: true,
    },
    empname: {
        type: String,
        required: true,
    },
    projects: {
        type: Array,
        required: true,
    },
    techstack: {
        type: Array,
        required:true
    },
    isActive:{
        type: Boolean,
        required:true,
    }
}])

const project = mongoose.model('projects',projects);
module.exports = project;

projects.plugin(uniqueValidator, {message: "Employee Id already exist in database"});
