const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.status(401).json({message:"Unauthorized user"});

    jwt.verify(token, "empManagement_SceretKEY", (err,user)=> {
        if(err) return res.status(403).json({message:"Give correct token"});
        req.user = user;
        next();
    });
}

//create token and return 
function generateAccessToken(username) {
    return jwt.sign({data: username}, "empManagement_SceretKEY", {
        expiresIn: '60h' //payload,secretkey,expiry
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken,
}