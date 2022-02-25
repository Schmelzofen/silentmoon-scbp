const { connect } = require("../db/connection")
const { registerUser } = require("../db/DAO")
const crypto = require('crypto')
const validator = require("email-validator")
const jwt = require("jsonwebtoken")
const salt = process.env.salt
var SpotifyWebApi = require('spotify-web-api-node')
const ObjectId = require("mongodb").ObjectId

const credentials = {
    clientId: process.env.CID,
    clientSecret: process.env.CS,
    redirectUri: "http://localhost:3001/home"
}
const spotifyApi = new SpotifyWebApi(credentials)

async function registrationController(req, res) {
    const db = await connect()
    const user = req.body
    console.log(req.body)
    const validMail = validator.validate(user.email)
    if (validMail) {
        const findUser = await db.collection('silentmoon').findOne({
            $or: [
                { email: req.body.email },
            ]
        })
        if (findUser) {
            return res.status(400).send({ "Error": "Duplicate User detected." })
        }
        if (!findUser) {
            req.body.passwort = crypto.pbkdf2Sync(req.body.passwort, salt, 1000, 64, "sha512").toString("hex")
            const createdUser = registerUser(req.body)
                .then((result) => {
                    console.log(result)
                    return res.json({ accessToken: jwt.sign({ findUser: req.body, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.SECRETKEY) })
                })
        }
    } else if (!validMail) {
        return res.status(400).send({ "Error": "Check email or password length" })
    }
}

async function loginController(req, res) {
    const db = await connect()
    const user = req.body
    console.log(req.body)
    const token = await spotifyApi
        .clientCredentialsGrant()
        .then(data => {

            spotifyApi.setAccessToken(data.body["access_token"])
            return data
        })
        .catch(error => console.log("Something went wrong retrieving the data."))

    const findUser = await db.collection('silentmoon').findOne({
        $or: [
            { email: user.email },
        ]
    })
    if (findUser) {
        const passwordToBeChecked = crypto.pbkdf2Sync(req.body.passwort, salt, 1000, 64, "sha512").toString("hex")
        if (passwordToBeChecked === findUser.passwort) {
            return res.status(200).json({ accessToken: jwt.sign({ findUser, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.SECRETKEY), token })
        } else {
            return res.status(500).send({ "Error": "Wrong password" })
        }
    } else {
        return res.status(500).send({ "Error": "Credentials mismatch" })
    }
}

async function changeUserDetailsController(req, res) {
    const db = await connect()
    if (req.body.passwort) {
        console.log("were going this route")
        const passwordWhichNeedsToBeCompared = crypto.pbkdf2Sync(req.body.oldPassword, salt, 1000, 64, "sha512").toString("hex")
        const hashPassword = crypto.pbkdf2Sync(req.body.passwort, salt, 1000, 64, "sha512").toString("hex")
        const getUser = await db.collection("silentmoon").findOne({ _id: ObjectId(req.body._id) })
            .then((user) => {
                console.log("getting the user", user)
                return user
            })
            .catch((err) => {
                return res.status(500).send({ "Error": err })
            })
        if (getUser.passwort === passwordWhichNeedsToBeCompared) {
            const changeThisPassword = await db.collection("silentmoon").updateOne({ _id: ObjectId(req.body._id) }, { $set: { passwort: hashPassword } })
                .then(() => {
                    return res.status(200).send({ "Success": "Password has been changed" })
                })
                .catch((err) => {
                    return res.status(500).send({ "Error": err })
                })
        }
    }
    if (req.body.email) {
        const getUser = await db.collection("silentmoon").updateOne({ _id: ObjectId(req.body._id) }, { $set: { email: req.body.email } })
            .then(() => {
                return res.status(200).send({ "Success": "Email has been changed" })
            })
            .catch((err) => {
                return res.status(500).send({ "Error": err })
            })
    }
    if (req.body.picture) {
        const getUser = await db.collection("silentmoon").updateOne({ _id: ObjectId(req.body._id) }, { $set: { image: req.body.picture } })
            .then(() => {
                return res.status(200).send({ "Success": "Picture has been changed" })
            })
            .catch((err) => {
                return res.status(500).send({ "Error": err })
            })
    }
}

const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: "User is not authenticated." });
    }
}

module.exports = {
    registrationController,
    loginController,
    loginRequired,
    changeUserDetailsController
}