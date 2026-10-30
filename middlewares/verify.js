const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const fullToken = req.headers.authorization;
  if (!fullToken) return res.status(401).json("UnAuthorized Access");

  console.log("TOKEN:", fullToken);

  const token = fullToken.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.SPECIAL_KEY, (err, student) => {
    console.log("ERROR:", err);
    console.log("STUDENT:", student);
    if (err) return res.status(403).json("Forbidden Access");

    req.student = student;
    next();
  });
};

const verifyRole = async (req, res, next) => {
  if (!req.student)
    return res.status(401).json("User needs to be Authenticated");

  if (req.student.role !== "admin")
    return res.status(403).json("Forbidden Access");

  next();
};

module.exports = { verifyToken, verifyRole };