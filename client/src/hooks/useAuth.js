import { useEffect, useState } from "react"
import axios from "axios"


export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState("")

    useEffect(() => {
        axios
            .post("/auth/spotify", { code })
            .then((response) => {
                console.log(response)
                window.history.pushState({}, null, "/")
                console.log("DATA", response.data)
                setAccessToken(response.data.accessToken)
            })
            .catch(() => {
                console.log("No token")
            })
    }, [code])

    return accessToken
}