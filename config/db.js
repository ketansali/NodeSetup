"use strict";
let mongoose = require("mongoose");
require("../models/userSchema");
require("../models/departmentSchema");

console.log("dburl", process.env.databaseUri);
mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});
mongoose.Promise = global.Promise;

mongoose.connect(process.env.databaseUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection failed"));

db.once("open", function () {
  console.log("Database connected successfully!");
});
