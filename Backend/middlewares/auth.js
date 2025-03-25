const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Access denied! No token provided"});
    }

    try{
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
        next();
    }
    catch(error){
        console.log("Error auth middleware! ",error);
        return req.status(401).json({message: "Invalid token"});
    }
}

module.exports = authmiddleware;