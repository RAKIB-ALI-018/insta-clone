const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post.controller")
const multer = require("multer") 

//* by default hamara server file read nahi kar pata  isiliye multer ka use kiya hai
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

/** 
 * @routes POST /api/posts/ [protected]
 * @description is baar raw mein nahi data-form mein data send karenge post man m Kyuki iss baar file(image) bhi send karni hai.
*/
postRouter.post("/", identifyUser, upload.single("image"), postController.createPostController)


/**
 * @routes GET /api/posts/ [protected]
 * @description get all the posts created by user that request come from.
 */
postRouter.get("/",identifyUser,  postController.getPostController )


/** 
 * @routes GET /api/posts/details/:postId
 * @description return an detail about specific post with with the id, also check whether the post belongs to the user that is requesting
*/
postRouter.get("/details/:postId",identifyUser,  postController.getPostDetailsController)


/** 
* @routes POST /api/posts/like/:postid
* @description like a post with id provided in the request paramas
*/
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

/**
 * @routes GET /api/posts/feed
 * @description get all the post created in DB
 */

postRouter.get("/feed", identifyUser, postController.getFeedController)

module.exports = postRouter