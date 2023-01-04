"use strict";
const jwt = require("jsonwebtoken");

const ensureAuthorized = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (
    !(typeof bearerHeader !== "undefined" && process.env.secret) ||
    !bearerHeader
  ) {
    return res.status(401).json({
      message: "Auth token not found",
      isSuccess: false,
    });
  }
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  jwt.verify(bearerToken, process.env.secret, async function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: "Auth token not found",
        error: err,
        isSuccess: false,
      });
    } else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = {
  ensureAuthorized,
};
