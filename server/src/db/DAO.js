const { connect } = require("./connection")
const ObjectId = require("mongodb").ObjectId

async function getUser() {
    const db = await connect()
    const userList = await db.collection("silentmoon")
        .find()
        .toArray()
    return userList
}

async function registerUser(user) {
    const db = await connect()
    const createdUser = await db.collection("silentmoon")
        .insertOne(user)
    return createdUser
}

async function getUserById(id) {
    const db = await connect()
    const foundUser = await db.collection("silentmoon").findOne({ _id: ObjectId(id) })
    return foundUser
}

module.exports = { getUser, registerUser, getUserById }