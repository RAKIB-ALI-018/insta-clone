const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authController = require("../controller/auth.controller")
const identifyUser = require("../middlewares/auth.middleware")

// POST /api/auth/register
authRouter.post("/register", authController.registerController )

// POST /api/auth/login
authRouter.post("/login", authController.loginController )

//GET /api/auth/get-me
authRouter.get("/get-me", identifyUser,authController.getMeController)

module.exports = authRouter