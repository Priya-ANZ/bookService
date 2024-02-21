const jwt = require("jsonwebtoken");


function authenticate(req, res, next) {
  const {JWTKEY} = process.env;
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({message:"Access denied. No token read"});
  try {
    const decoded = jwt.verify(token, JWTKEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({message:"Invalid token"});
  }
}

module.exports = authenticate;