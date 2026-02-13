const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")


async function registerController(req, res) {
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

    res.status(201).json({
        messaage: "User registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
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
    })

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordValid = hash === user.password

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User login successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }

    })

}


module.exports = {
    registerController,
    loginController
}