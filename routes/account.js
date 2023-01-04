const express = require("express");
const router = express.Router();

const accountController = require("../controllers/AccountController");
const {
  loginValidation,
  registerValidation,
} = require("../validators/accountValidation");

router.post("/login", loginValidation, function (req, res) {
  return accountController.account.login(req, res);
});

router.post("/register", registerValidation, function (req, res) {
  return accountController.account.register(req, res);
});
module.exports = router;
