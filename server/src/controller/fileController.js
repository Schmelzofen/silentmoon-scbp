const { connect } = require("../db/connection")

async function fileController(req, res) {
    const db = await connect()
    const foundUser = await db.collection("silentmoon").updateOne({ email: req.body.email }, { $set: { image: req.body.image } }, { upsert: true })
        .then((result) => {
            res.send({ "User has been updated": result })
        })
        .catch((err) => res.send({ "Error": err.message }))
}

module.exports = { fileController }