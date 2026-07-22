const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require('cors')
const path = require("path")

//require routes
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")
//


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

//using routes
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)
//

// Static files serve karo (frontend ka production build)
app.use(express.static(path.join(__dirname, "..", "public")))

// SPA fallback — React Router client-side routing ke liye zaroori
app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

module.exports = app