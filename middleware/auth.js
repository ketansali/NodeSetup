"use strict";
const jwt = require("jsonwebtoken");

const allowedUrls = [
  "/login",
  "/register",
  "/change-password",
  "/forget-password",
  "/verify-otp",
  "/send-mobile-otp",
  "/verify-mobile-otp",
  "/get-invitation-by-id",
  "/activate-account",
];
const adminUrls = [];

const ensureAuthorized = (req, res, next) => {
  if (allowedUrls.indexOf(req.path.toLowerCase()) !== -1) {
    return next();
  }
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
      if (adminUrls.indexOf(req.path) !== -1 && !decoded.isAdmin) {
        return res.status(401).json({
          message: "You are not allowed to access this api",
          isSuccess: false,
        });
      } else {
        req.user = decoded;
        next();
      }
    }
  });
};

module.exports = {
  ensureAuthorized,
};
