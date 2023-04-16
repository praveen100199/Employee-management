const performance = require("../models/performance.model");

    //get ratings of employees based on the emp rating value
    
    exports.getRatings = async (req, res) => {
        try {
            const rating = (req.query.rating);
            const emp = await performance.findOne({ rating });
            if (!emp) {
            return res.status(404).json({ message: "Employee with this rating not found" });
            }
            res.json(emp);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
        
    