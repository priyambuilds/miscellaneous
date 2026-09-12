const jwt = require("jsonwebtoken");

function authMiddleWare(req, res, next) {
    const token = req.headers.token;

    const decoded = jwt.verify(token, "ultrasupersecretpassword123");
    const userId = decoded.userId;
    if (userId) {
        req.userId = userId;
        next();
    } else {
        res.status(403).json({
            message: "Token was incorrect"
        })
    }
}

module.exports = {
    authMiddleWare: authMiddleWare
}