const performanceService = require('../services/performance.service');

exports.createPerformance = (req,res, next) => {
    performanceService.createPerformance(req.body, (error, result) => {
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