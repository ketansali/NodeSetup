"use strict";
var mongoose = require("mongoose");

var DepartmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      trim: true,
    },
    categoryName: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    salary: {
      type: Number,
      trim: true,
    },
    employeeID: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const department = mongoose.model("department", DepartmentSchema);
module.exports = department;
