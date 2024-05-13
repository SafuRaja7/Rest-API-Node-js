const jwt = require("jsonwebtoken");
const { use } = require("../routes/products_routes");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "SnipperSecretKey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(userName) {
  return jwt.sign({ date: userName }, "SnippetSecretKey", {
    expiresIn: "1h",
  });
}

module.exports = { generateAccessToken, authenticateToken };
