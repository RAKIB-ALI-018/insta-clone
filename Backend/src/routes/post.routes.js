const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post.controller")
const multer = require("multer") 
//by default hamara server file read nahi kar pata 
//isiliye multer ka use kiya hai
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

/** 
 * POST /api/posts/ [protected]
 * /req.body = {caption, imageUrl}
 * /api/posts/
*/

/**
 * is baar raw mein nahi data-form mein data send karenge 
 * post man m Kyuki iss baar file(image) bhi send karni hai
*/
postRouter.post("/",upload.single("image"),identifyUser, postController.createPostController) 


// GET /api/posts/ [protected]
postRouter.get("/",identifyUser,  postController.getPostController )


/** 
 * GET /api/posts/details/:postId
 * return an detail about specific post with with the id
 * also check whether the post belongs to the user that is requesting
*/
postRouter.get("/details/:postId",identifyUser,  postController.getPostDetails)



//* @routes POST /api/posts/like/:postid
//* @description like a post with id provided in the request paramas
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

module.exports = postRouter