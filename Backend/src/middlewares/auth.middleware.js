const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next) {
    // Ye logic check karta hai ki request ke saath valid 
    // login token (cookie) aaya hai ya nahi.
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Token not provided, unauthorized access"
        })
    }

    // ye logic check karega ki token fack to nahi hai
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }

    req.user = decoded
    next()
}

module.exports=identifyUser