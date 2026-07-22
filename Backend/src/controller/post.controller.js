const postmodel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require('@imagekit/nodejs')
const jwt = require("jsonwebtoken")
const postModel = require("../models/post.model")
const likeModel = require("../models/like.model")

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "img",
        folder: "insta-clone-folder"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post Created Successfully.",
        post
    })
}

async function getPostController(req, res) {


    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully.",
        posts
    })

}

async function getPostDetailsController(req, res) {


    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "post not found"

        })
    }

    const isValidUser = post.user.toString() === userId
    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content"

        })
    }

    return res.status(200).json({
        message: "Post Fetched Successfully.",
        post
    })
}


// Post like/unlike controller
async function likePostController(req, res) {
    const userId = req.user.id   
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({ message: "Post Not Found" })
    }

    const existingLike = await likeModel.findOne({
        post: postId,
        user: userId   
    })

    if (existingLike) {
        await likeModel.findByIdAndDelete(existingLike._id)
        return res.status(200).json({
            message: "Post unliked successfully"
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: userId   
    })

    res.status(200).json({
        message: "Post liked successfully",
        like
    })
}

async function getFeedController(req, res) {
    const user = req.user
    const posts = await Promise.all((await postModel.find().populate("user").lean()) //jab schema create hoga tab ref jaroor dena
        // * find() → Fetches all posts.
        // * populate("user") → Looks at the user field (an ObjectId) and 
        // * replaces it with the full user document from the User collection.

        //but isme password bhi aa rha hoga
        //isiliye "select:false" ka use karte hai schema mein(but ye problem karega login ke time)
        // to uske liye "select("+password")" ka use karenge..login controller mein

        .map(async (post) => {
            const isLiked = await likeModel.findOne({
                user: user.id,
                post: post._id
            })

            post.isLiked = !!isLiked

            return post
        }))

    res.status(200).json({
        message: "Posts Fetched Successfully",
        posts
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController
}