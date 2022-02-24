import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios"
import qs from "qs"
import { Buffer } from 'buffer'
import { useHttpClient } from "../hooks/http-hook";
import TokenContent from "./token-provider"
import env from "react-dotenv"

const MusicContent = React.createContext({
    getAuth: () => { },
    fetchedYogaData: () => { },
    fetchedMediData: () => { },
    fetchedFavData: () => { },
    favorites: [],
    yoga: [],
    meditation: [],
    code: "",
    workout: [],
    sleep: [],
    read: []
})

export const MusicContentProvider = (props) => {
    const [code, setCode] = useState("")
    const [yoga, setYoga] = useState([])
    const [meditation, setMeditation] = useState([])
    const [favorites, setFavorites] = useState([])
    const [workout, setWorkout] = useState([])
    const [sleep, setSleep] = useState([])
    const [read, setRead] = useState([])

    const { isLoading, error, sendRequest } = useHttpClient();
    const tokenCtx = useContext(TokenContent);

    const client_id = process.env.REACT_APP_CLIENT_ID || ""; // Your client id
    const client_secret = process.env.REACT_APP_CS || ""; // Your secret
    const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');
    const getAuth = async () => {
        try {
            const token_url = 'https://accounts.spotify.com/api/token';
            const data = qs.stringify({ 'grant_type': 'client_credentials' });

            const response = await axios.post(token_url, data, {
                headers: {
                    'Authorization': `Basic ${auth_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            setCode(response.data.access_token)
            return response.data.access_token;
        } catch (error) {
            console.log(error);
        }
    }

    const fetchedYogaData = async () => {
        try {
            const { data } = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${code}`
                },
                params: {
                    q: "YOGA",
                    type: "playlist"
                }
            })
            console.log("DATA", data)
            setYoga(data.playlists.items)
        } catch (e) { }
    };

    if (!code) {
        getAuth()
    }

    const fetchedMediData = async () => {
        try {
            const { data } = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${code}`
                },
                params: {
                    q: "meditation",
                    type: "playlist"
                }
            })
            setMeditation(data.playlists.items)
        } catch (e) { }
    };

    const fetchedFavData = async () => {
        let id;
        id = tokenCtx?.token?.user?._id ? tokenCtx?.token?.user?._id : tokenCtx?.token?.findUser?._id
        if (id) {
            console.log(id)
            try {
                const responseData = await sendRequest(`http://localhost:3000/api/favorite/${id}`);

                setFavorites(() => responseData.list);
            } catch (e) {
                console.log()
            }
        }
    };

    if (code && yoga.length === 0) {
        fetchedYogaData()
    }



    if (code && meditation.length === 0) {
        fetchedMediData()
    }



    if (tokenCtx.token && favorites.length === 0) {
        fetchedFavData()
    }

    if (code && workout.length === 0 && sleep.length === 0 && read.length === 0) {
        const getWorkout = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${code}`
                },
                params: {
                    q: "workout",
                    type: "playlist"
                }
            })
            setWorkout(data.playlists.items)
        }
        const getSleep = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${code}`
                },
                params: {
                    q: "sleep",
                    type: "playlist"
                }
            })
            setSleep(data.playlists.items)
        }
        const getRead = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${code}`
                },
                params: {
                    q: "read",
                    type: "playlist"
                }
            })
            setRead(data.playlists.items)
        }
        getWorkout()
        getSleep()
        getRead()
    }

    const musicData = {
        yoga,
        meditation,
        favorites,
        code,
        getAuth,
        fetchedYogaData,
        fetchedMediData,
        fetchedFavData,
        workout,
        sleep,
        read
    };

    return (
        <MusicContent.Provider value={musicData}>
            {props.children}
        </MusicContent.Provider>
    );
}

export default MusicContent