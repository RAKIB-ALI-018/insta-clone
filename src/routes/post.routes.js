const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post.controller")
const multer = require("multer") 
//by default hamara server file read nahi kar pata 
//isiliye multer ka use kiya hai
const upload = multer({storage:multer.memoryStorage()})


// POST /api/post [protected]
// req.body = {caption, imageUrl}
// /api/posts/

//is baar raw mein nahi data-form mein data send karenge post man m
//Kyuki iss baar file(image) bhi send karni hai
postRouter.post("/",upload.single("image"),postController.createPostController) 

module.exports = postRouter