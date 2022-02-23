const { connect } = require("../db/connection")
const ObjectId = require("mongodb").ObjectId

async function addFavoritesController(req, res) {
    const db = await connect()
    const { id, src, name, userId } = req.body;
    const createdProduct = {
        id,
        src,
        name,
    };
    const getUserFav = await db.collection("silentmoon").findOne({ _id: ObjectId(userId) })
    const doesItExist = getUserFav.favorites.filter((item) => item.id == createdProduct.id)
    if (doesItExist.length == 1) {
        const removedElement = await db.collection("silentmoon").updateOne({ _id: ObjectId(userId) }, { $pull: { favorites: createdProduct } })
        res.status(200).json({ message: "ok", list: getUserFav.favorites });
    } else {
        const insertedFav = await db.collection("silentmoon").updateOne({ _id: ObjectId(userId) }, { $addToSet: { favorites: createdProduct } }, { upsert: true })
        res.status(200).json({ message: "ok", list: getUserFav.favorites });
    }
}

async function getFavoritesController(req, res) {
    const db = await connect()
    console.log(req.headers)
    const id = req.params.id
    const favoriteList = await db.collection("silentmoon").findOne({ _id: ObjectId(id) })
    res.status(200).json({ message: "ok", list: favoriteList.favorites });
}

module.exports = { addFavoritesController, getFavoritesController }