const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")


//Register Controller
async function registerController(req, res)  {
    const { email, username, password, bio, profile_image } = req.body
    // const isUserExistsByEmail = await userModel.findOne({email})
    

    //This is the effective way to check whether user already exist or not
    const isUserAlreadyExist=await userModel.findOne({  
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User Already Exist"+ (isUserAlreadyExist.email === email ? "with this email":" with this username")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profile_image
    })

    const token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET, {expiresIn:"1d"})

    res.cookie("token", token)

    res.status(201).json({
        message:"User Registered Successfully.",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profile_image:user.profile_image

            //kabhi bhi password nahi denge
        }
    })
}

//Login Controller
async function loginController(req,res){
    const {username, email, password} = req.body

    //User can login through (username + password)
    // or (email + password)
    const user = await userModel.findOne({
        $or:[
            {username: username},
            {email:email}
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"User Not Found"
        })
    }

    

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Password is Invalid."
        })
    }

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET, {expiresIn:"1d"})

    res.cookie("token", token)

    res.status(200).json({
        message:"User Logged In Successfully.",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profile_image:user.profile_image
        }
    })
}


module.exports={
    registerController,
    loginController
}




