const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const empPerformance = mongoose.Schema([{
    
    empid: {
        type: Number,
        required: true,
        unique: true,
    },
    empname: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comments: {
        type:String,
        required:true
    },
    isActive:{
        type: Boolean,
        required:true,
    },
    yearsofexperiance: {
        type: Number,
        required: true,
    },
}])

const performance= mongoose.model('empPerformance',empPerformance);
module.exports = performance;

empPerformance.plugin(uniqueValidator, {message: "Employee Id already exist in database"});
