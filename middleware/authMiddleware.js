const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token, auth denied" });
  }

  try {
    const decode = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decode.id;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = auth;
