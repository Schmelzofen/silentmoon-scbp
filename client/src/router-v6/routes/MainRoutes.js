import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/Sign";
import Home from "../pages/Home";
import MusicList from "../pages/MusicList";
import NotFound from "../pages/NotFound";
import Breath from "../pages/Breath";
import Favorite from "../pages/Favorite";
import Premium from "../pages/Premium";
import Profile from "../pages/Profile";
import StartPage from "../pages/StartPage";
import Welcome from "../pages/Welcome";
import SignUp from "../pages/SignUp";
import {useContext} from "react"
import TokenContent from "../../store/token-provider"

const MainRoutes = () => {
  const tokenCtx = useContext(TokenContent)
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      {tokenCtx.token && (
        <>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/list/:lid" element={<MusicList />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/favs" element={<Favorite />} />
      <Route path="/breath" element={<Breath />} />
      <Route path="/premium" element={<Premium />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
