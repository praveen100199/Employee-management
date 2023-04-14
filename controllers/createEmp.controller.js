const express = require('express');
const mongoose = require('mongoose');
const CreateEmp = require('../models/createEmp.model');

const app = express();
app.use(express.json());

exports.createEmployee = app.post('/createemp',async (req,res)=> {
    const createEmp = req.body;
    try{
        const newEmpData = new CreateEmp(createEmp);
        newEmpData.save();
        return res.json(await CreateEmp.find());
    }
    catch(err){
        console.log(err.message);
    }
})