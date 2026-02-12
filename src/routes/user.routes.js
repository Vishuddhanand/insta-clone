const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()
const crypto = require("crypto")
const jwt = require("jsonwebtoken")


authRouter.post("/register", async (req, res) => {
    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { password }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409)
            .json({
                messaage: "User Already exists" + (isUserAlreadyExists.username == username ? "Username Already Exists" : "Email Already Exists")
            })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }

    )

    res.cookie("token", token)

    res.staatus(201).json({
        messaage: "User registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })



})

module.exports = authRouter