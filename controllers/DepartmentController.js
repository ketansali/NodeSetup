const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const errorResponse = require("../middleware/error-response");
const { cloneDeep } = require("../lib/commonQuery");
const {
  badRequestResponse,
  successResponse,
  notFoundResponse,
} = require("../middleware/response");
const DEPARTMENT = mongoose.model("department");

exports.department = {
  add: async function (req, res) {
    try {
      const data = {
        departmentName: req.body.departmentName,
        categoryName: req.body.categoryName,
        location: req.body.location,
        salary: req.body.salary,
        employeeID: req.body.employeeID,
      };
      const isCreated = await DEPARTMENT.create(data);
      if (isCreated) {
        return successResponse(res, {
          message: "created successfully",
        });
      } else {
        return badRequestResponse(res, {
          message: "Failed to create",
        });
      }
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  update: async function (req, res) {
    try {
      const data = await DEPARTMENT.findOne({
        _id: req.body.id,
      });
      if (!data) {
        return badRequestResponse(res, {
          message: "not found",
        });
      }
      await DEPARTMENT.findOneAndUpdate(
        { _id: data._id },
        {
          $set: {
            departmentName: req.body.departmentName,
            categoryName: req.body.categoryName,
            location: req.body.location,
            salary: req.body.salary,
            employeeID: req.body.employeeID,
          },
        }
      );
      return successResponse(res, {
        message: "updated successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  get: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const pageSize = Number(req.query.pageSize) || 5;
      const skip = (page - 1) * pageSize;
      const data = await DEPARTMENT.find({}).skip(skip).limit(pageSize);
      return successResponse(res, {
        data: cloneDeep(data),
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  delete: async function (req, res) {
    try {
      const data = await DEPARTMENT.findOne({
        _id: req.query.id,
      });
      if (!data) {
        return badRequestResponse(res, {
          message: "not found",
        });
      }
      await DEPARTMENT.findByIdAndRemove({
        _id: data._id,
      });
      return successResponse(res, {
        message: "deleted successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getById: async function (req, res) {
    try {
      const data = await DEPARTMENT.findOne({
        _id: req.query.id,
      });
      if (!data) {
        return badRequestResponse(res, {
          message: "not found",
        });
      }
      return successResponse(res, {
        data: cloneDeep(data),
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getByLocation: async function (req, res) {
    try {
      const data = await DEPARTMENT.find({
        departmentName: "IT",
        location: /^a/i,
      });
      return successResponse(res, {
        data: cloneDeep(data),
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getByDepartment: async function (req, res) {
    try {
      const data = await DEPARTMENT.find({
        departmentName: { $regex: req.query.departmentName, $options: "i" },
      })
        .populate("employeeID")
        .sort({ "employeeID.firstName": -1, "employeeID.lastName": -1 });
      return successResponse(res, {
        data: cloneDeep(data),
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
};
