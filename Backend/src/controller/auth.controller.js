const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
}

async function registerController(req, res) {
    const { email, username, password, bio, profile_image } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User Already Exist " + (isUserAlreadyExist.email === email ? "with this email" : "with this username")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profile_image
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token, cookieOptions)

    res.status(201).json({
        message: "User Registered Successfully.",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })
}

async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    }).select("+password")

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Password is Invalid."
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        message: "User Logged In Successfully.",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })
}

async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
        user: {
            username: user.username,
            profile_image: user.profile_image,
            bio: user.bio,
            email: user.email
        }
    })
}


module.exports = {
    registerController,
    loginController,
    getMeController
}