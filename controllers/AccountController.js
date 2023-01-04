const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const errorResponse = require("../middleware/error-response");
const { cloneDeep } = require("../lib/commonQuery");
const {
  badRequestResponse,
  successResponse,
  notFoundResponse,
} = require("../middleware/response");
const USER = mongoose.model("users");

exports.account = {
  getImageOptions: function (req) {
    let pathDirectory = __dirname.split("\\");
    pathDirectory.pop();
    pathDirectory = pathDirectory.join("\\");
    const uploadedFile = req.files.image;
    const extension =
      uploadedFile.name.split(".")[uploadedFile.name.split(".").length - 1];
    const fileName = `${new Date().valueOf()}_${Math.ceil(
      Math.random() * 10000
    )}.${extension}`;
    const uploadFilePath = `${pathDirectory}/uploads/${fileName}`;
    return {
      fileName,
      uploadFilePath,
      uploadedFile,
    };
  },
  login: async function (req, res) {
    try {
      let userInfo = await USER.findOne({
        email: req.body.email,
      });
      if (userInfo) {
        if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
          return badRequestResponse(res, {
            message: "Authentication failed. Wrong password.",
          });
        }
        userInfo = cloneDeep(userInfo);
        delete userInfo["password"];
        // create a token
        let token = jwt.sign(userInfo, process.env.secret, {
          expiresIn: "24h", // expires in 24 hours
        });
        return successResponse(res, {
          message: "You are logged in successfully!",
          token,
          userInfo,
        });
      }
      return notFoundResponse(res, {
        message: "Email not found!",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  register: async function (req, res) {
    try {
      const userInfo = await USER.findOne({
        email: req.body.email,
      });
      if (userInfo) {
        return badRequestResponse(res, {
          message: "Email already exist!",
        });
      }
      if (req.body.password !== req.body.confirmPassword) {
        return badRequestResponse(res, {
          message: "Password and Confirm Password must be same",
        });
      }
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };
      if (req.files && Object.keys(req.files).length > 0) {
        const fileInfo = this.getImageOptions(req);

        user.image = fileInfo.fileName;
        fileInfo.uploadedFile.mv(fileInfo.uploadFilePath, async (err) => {
          if (err)
            return badRequestResponse(res, {
              message: "Failed to save file",
            });
          let isCreated = await USER.create(user);
          if (isCreated)
            return successResponse(res, {
              message: "User created!",
            });
          else
            return badRequestResponse(res, {
              message: "Failed to create user",
            });
        });
      } else {
        let isCreated = await USER.create(user);
        if (isCreated)
          return successResponse(res, {
            message: "User created!",
          });
        else
          return badRequestResponse(res, {
            message: "Failed to create user",
          });
      }
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
};
