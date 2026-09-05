const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, "attlassionsupersecret1234password")
    const userId = decoded.userId;
    if (userId) {
        req.userId
        next()
    } else {
        res.status(403).json({
            message: "Token was incorrect"
        })
    }
}

module.exports = {
    authMiddleware: authMiddleware
}