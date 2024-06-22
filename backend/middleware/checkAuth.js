const jwt = require("jsonwebtoken");

let user = require("../models/user");

const checkAuth = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers?.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }
let token= req.headers?.authorization.split(" ")[1]
  try {
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    let user_id= decoded.user_id
    req.user_id=user_id
    next()
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = checkAuth;
