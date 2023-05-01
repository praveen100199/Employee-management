const performance = require("../models/performance.model");
const logger = require("../middlewares/logger")

    //get ratings of employees based on the emp rating value
    
    exports.getRatings = async (req, res) => {
        try {
            const rating = (req.query.rating);
            const emprating = await performance.find({rating})
            if (!emprating) {
            return res.status(404).json({ message: "Employee with this rating not found" });
            }
            res.json({status:200, message:"Success", Ratings: emprating});
        } catch (error) {
            logger.employeeLogger.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    //get good ratings of employees equal to 3 and more than 3

    exports.getRatingMoreThanThree = async (req, res) => {
        try {
            // const ratings = (req.query.rating);
            const emprating = await performance.find({ rating: { $gt: 2.9 } })
            if (!emprating) {
            return res.status(404).json({ message: "Employee with this rating not found" });
            }
            res.json({status:200, message:"Success", goodRatings: emprating});
        } catch (error) {
            logger.employeeLogger.error(error);
            res.status(500).json({ message: error.message });
        }
    }


    // get bad ratings of employees that are less than 3

    exports.getRatingLessThanThree = async (req, res) => {
        try {
            // const ratings = (req.query.rating);
            const emprating = await performance.find({ rating: { $lt: 3 } })
            if (!emprating) {
            return res.status(404).json({ message: "Employee with this rating not found" });
            }
            res.json({status:200, message:"Success", badRatings: emprating});
        } catch (error) {
            logger.employeeLogger.error(error);
            res.status(500).json({ message: error.message });
        }
    }
        
    