var SpotifyWebApi = require('spotify-web-api-node')

const credentials = {
    clientId: process.env.CID,
    clientSecret: process.env.CS,
    redirectUri: "http://https://silentmoonproject.herokuapp.com/home"
}
const spotifyApi = new SpotifyWebApi(credentials)

spotifyApi
    .clientCredentialsGrant()
    .then(data => {
        spotifyApi.setAccessToken(data.body["access_token"])
    })
    .catch(error => console.log("Something went wrong retrieving the data."))



async function getPlaylistYoga(req, res) {
    const yoga = await spotifyApi.searchPlaylists('yoga')
        .then(function (data) {
            console.log(data)
            return res.status(200).send(data.body.playlists.items)
        }, function (err) {
            return res.status(500).send({ "Error": err.message })
        });
}

async function getPlaylistMeditation(req, res) {
    const meditation = await spotifyApi.searchPlaylists('meditation')
        .then(function (data) {
            return res.status(200).send(data.body.playlists.items)
        }, function (err) {
            return res.status(500).send({ "Error": err.message })
        });
}

async function getPlaylistByMood(mood) {
    const music = await spotifyApi.searchPlaylists(mood, { limit: 20, offset: 1 })
        .then(function (data) {
            return data
        }, function (err) {
            console.log("Something went wrong!", err);
        })
    return music
}

async function getPlaylistById(req, res) {
    const id = req.params.id
    const playlist = await spotifyApi.getPlaylist(id)
    res.status(200).json(playlist)
}

async function spotifyTokenController(req, res) {
    const spotifyApi = new SpotifyWebApi(credentials)
    const code = req.params.id
    spotifyApi.authorizationCodeGrant(code)

        .then((data) => {
            console.log(data)
            res.json({
                accessToken: data.body.access_token
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
}

module.exports = {
    getPlaylistByMood,
    getPlaylistById,
    getPlaylistMeditation,
    getPlaylistYoga,
    spotifyTokenController
}