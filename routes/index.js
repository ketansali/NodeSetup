const router = require("express").Router();
const { ensureAuthorized } = require("../middleware/auth");
const accountRoutes = require("./account");
const departmentRoutes = require("./department");

router.use("/account", accountRoutes);
router.use("/department", ensureAuthorized, departmentRoutes);
module.exports = router;
