const Empdetails = require("../models/empDetails.model");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const logger = require("../middlewares/logger")

exports.HiredEmp = async (req, res) => {
    // Search hired employee between the dates
        const sdate = req.body.startdate
        const startDate = new Date(req.body.startdate);
        const endDate = new Date(req.body.enddate);

        var datesCondition = {dateofjoining : {$gte:startDate, $lte:endDate}}
        Empdetails.find(datesCondition)
        .then(data => {
            if (data.length === 0) {
                res.send('No Employee found with-in these dates'); // Handle empty res here
            }
            else{
                // res.json({data:data});

                //create pdf document
                const doc = new PDFDocument();

                //set response headers
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=filteredemp.pdf');

                //Pipe PDF document to response
                doc.pipe(res);

                //Add employee data to PDF document
                doc.fontSize(14).text('Filtered Hired Employee Data', { align: 'center'});
                doc.moveDown();
                data.forEach((emp,index)=>{
                    doc.fontSize(12).text(`${index + 1}. ${emp.empname} (${emp.dateofjoining})`);
                });

                // Finalize PDF document
                doc.end();
            }            
        })
        .catch(err => {
            logger.employeeLogger.error(err);

            res.status(500).json({
            message:
                err.message || "Some error occurred while retrieving data"
            });
        });
    }


