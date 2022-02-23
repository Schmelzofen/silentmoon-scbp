const { MongoClient } = require('mongodb')

let _db

async function connect() {
    if (_db) return _db

    const URL = process.env.URL
    const client = new MongoClient(URL)
    const connected_client = await client.connect()
    _db = connected_client.db("sc")

    return _db
}

module.exports = { connect }