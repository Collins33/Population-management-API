const jwt = require("jsonwebtoken");

/**
 * @method checkAuth
 * @summary - Check to ensure the user is authenticated
 * @param request body, response body
 * @returns json message
 */
exports.checkAuth = (req, res, next) => {
  try {
    const headerToken = req.headers["authorization"];
    const token = headerToken.slice(7, headerToken.length);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Auth failed"
    });
  }
};
