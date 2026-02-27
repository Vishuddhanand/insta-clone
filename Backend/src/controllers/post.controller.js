const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.model")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})



async function createPostController(req, res) {
    console.log(req.body, req.file)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "Test",
        folder: "insta-clone"
    })


    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })


}

async function getPostController(req, res) {


    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })


    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })


}

async function getPostDetailsController(req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isUserValid = post.user.toString() === userId

    if (!isUserValid) {
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully",
        post
    })

}

async function likePostController(req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })

    }

    const like = await likeModel.create({
        post: postId,
        user: req.user.username
    })

    res.status(200).json({
        message: "Post liked successfully",
        like
    })

}

async function getFeedController(req, res) {

    const user = req.user

    const posts = await Promise.all((await postModel.find({}).sort({ _id: -1 }).populate("user").lean())
        .map(async (post) => {

            const isLiked = await likeModel.findOne({
                user: user.username,
                post: post._id
            })

            post.isLiked = Boolean(isLiked)

            return post
        }))



    res.status(200).json({
        message: "Feed fetched successfully",
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