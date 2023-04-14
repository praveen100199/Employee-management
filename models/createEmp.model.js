const mongoose = require('mongoose');

const createEmp = mongoose.Schema({
    
    empid: {
        type: String,
        required: true,
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

module.exports = mongoose.model('createEmp',createEmp);
