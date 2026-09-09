const jwt = require("jsonwebtoken");

const SECRET = "attlassionsupersecret1234password";

function authMiddleware(req, res, next) {
  const token = req.headers.token;
  try {
    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.userId;
    if (userId) {
      req.userId = userId;
      next();
      return;
    }
  } catch (error) {
    // Treat missing, malformed, and expired tokens uniformly.
  }

  res.status(403).json({
    message: "Token was incorrect",
  });
}

module.exports = {
  authMiddleware: authMiddleware,
};
