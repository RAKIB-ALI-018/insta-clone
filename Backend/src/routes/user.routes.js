const express = require("express")
const userController = require("../controller/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()


// @route POST /api/users/follow/:userid
// @description Follow a user
// @access private

userRouter.post("/follow/:username", identifyUser, userController.followUserController)




// @route POST /api/users/follow/:userid
// @description Unfollow a user
// @access private
userRouter.post("/unfollow/:username", identifyUser, userController.unFollowUserCOntroller)



module.exports = userRouter