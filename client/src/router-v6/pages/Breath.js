import { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../../components/UI/spinner/LoadingSpinner";
import Logo from "../../components/UI/Logo";
import BreathText from "../../components/UI/BreathContent/BreathText";
import BreathNav from "../../components/UI/BreathContent/BreathNav";
import FlexForFavs from "../../components/UI/FlexForFavs";
import Pcard from "../../components/UI/Pcard";
import BreathMusicList from "../../components/UI/BreathContent/BreathMusicList";
import Footer from "../../components/footer/Footer";

import MusicContent from "../../store/musicProvider"

const Breath = () => {
  const [filterValue, setFilterValue] = useState("workout");
  const [fetchedMusic, setFetchedMusic] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const music = useContext(MusicContent)

  const valueFromNav = (string) => {
    setFilterValue(string);
  };

  useEffect(() => {
    const fetchedData = () => {
      if (filterValue === "workout") {
        setFetchedMusic(music.workout)
      }
      if (filterValue === "sleep") {
        setFetchedMusic(music.sleep)
      }
      if (filterValue === "read") {
        setFetchedMusic(music.read)
      }
    }
    fetchedData()
  });
  console.log()
  return (
    <>
      <Logo />
      <Pcard>
        <BreathText />
        <BreathNav onClick={valueFromNav} />
        <FlexForFavs>
          {error && <h1>Cant fetch data</h1>}
          {isLoading && !error && <LoadingSpinner asOverlay />}
          {!isLoading && <BreathMusicList music={fetchedMusic} />}
        </FlexForFavs>
      </Pcard>
      <Footer />
    </>
  );
};

export default Breath;
