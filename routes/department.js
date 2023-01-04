const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/DepartmentController");
const { departmentValidation } = require("../validators/departmentValidation");

router.post("/add", departmentValidation, function (req, res) {
  return departmentController.department.add(req, res);
});

router.post("/update", function (req, res) {
  return departmentController.department.update(req, res);
});

router.get("/get", function (req, res) {
  return departmentController.department.get(req, res);
});

router.delete("/delete", function (req, res) {
  return departmentController.department.delete(req, res);
});

router.get("/get-by-id", function (req, res) {
  return departmentController.department.getById(req, res);
});
router.get("/getByLocation", function (req, res) {
  return departmentController.department.getByLocation(req, res);
});
router.get("/getByDepartment", function (req, res) {
  return departmentController.department.getByDepartment(req, res);
});
module.exports = router;
