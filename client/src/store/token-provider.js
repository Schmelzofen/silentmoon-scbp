import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import jwt_decode from "jwt-decode"
import Resizer from "react-image-file-resizer"
import placeholder from "../icons/placeholder.png"

const TokenContent = React.createContext({
  token: "",
  login: () => { },
  logout: () => { },
  signup: () => { },
});

export const TokenContentProvider = (props) => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = JSON.parse(token)
      setToken(parsedToken);
    }
  }, []);

  const login = async (data) => {
    try {
      const responseData = await sendRequest(
        "/auth/login",
        "POST",
        JSON.stringify({
          email: data.email,
          passwort: data.passwort,
        }),
        { "Content-Type": "application/json" }
      );
      if (responseData && !error) {
        const encodedToken = jwt_decode(responseData.accessToken)
        setToken(encodedToken);
        localStorage.setItem("token", JSON.stringify(encodedToken))
        navigate("/welcome");
      }
    } catch (e) {
      console.log(e)
    }
  };

  const logout = (data) => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/")
  };
  const signup = async (data, file) => {
    console.log("FILE", file.files[0])
    if (file.files.length === 1) {
      try {
        const resized = Resizer.imageFileResizer(file.files[0], 200, 200, "JPEG", 100, 0, async (uri) => {
          const responseData = await sendRequest(
            "/auth/registration",
            "POST",
            JSON.stringify({
              email: data.email,
              passwort: data.passwort,
              name: data.name,
              image: uri,
              favorites: [],
            }),
            { "Content-Type": "application/json" }
          );
          if (responseData && responseData.accessToken && !error) {
            const encodedToken = jwt_decode(responseData.accessToken)
            setToken(encodedToken);
            localStorage.setItem("token", JSON.stringify(encodedToken))
            navigate("/welcome");
          }
        }, "base64", 200, 200)
      } catch (e) {
        console.log(e)
      }
    } else if (file.files.length === 0) {
      try {
        const responseData = await sendRequest(
          "/auth/registration",
          "POST",
          JSON.stringify({
            email: data.email,
            passwort: data.passwort,
            name: data.name,
            image: placeholder,
            favorites: [],
          }),
          { "Content-Type": "application/json" }
        );
        if (responseData && responseData.accessToken && !error) {
          const encodedToken = jwt_decode(responseData.accessToken)
          setToken(encodedToken);
          localStorage.setItem("token", JSON.stringify(encodedToken))
          navigate("/welcome");
        }
      } catch (e) {
        console.log(e)
      }
    }
  };

  const tokenData = {
    isLoading,
    error,
    token,
    login,
    logout,
    signup,
  };

  return (
    <TokenContent.Provider value={tokenData}>
      {props.children}
    </TokenContent.Provider>
  );
};

export default TokenContent;
