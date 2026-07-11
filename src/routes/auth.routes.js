const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authController = require("../controller/auth.controller")

// POST /api/auth/register
authRouter.post("/register", authController.registerController )

// POST /api/auth/login
authRouter.post("/login", authController.loginController )

module.exports = authRouter