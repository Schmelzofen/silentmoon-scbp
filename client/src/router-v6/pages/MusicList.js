import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../../components/UI/spinner/LoadingSpinner";
import TokenContent from "../../store/token-provider";
// comps
import LidBackground from "../../components/UI/MusicList/LidBackground";
import LidDescr from "../../components/UI/MusicList/LidDescr";
import Pcard from "../../components/UI/Pcard";
import LidTrackList from "../../components/UI/MusicList/LidTrackList";
import Modal from "../../components/modal/Modal";
import ModalAudio from "../../components/modal/ModalAudio";

import classes from "./MusicList.module.css";
import ButtonsDiv from "../../components/UI/buttons/ButtonsDiv";
import Footer from "../../components/footer/Footer";

import axios from "axios"
import MusicContent from "../../store/musicProvider"

const MusicList = ({ code }) => {
  const [fetchedMusic, setFetchedMusic] = useState();
  const [modalState, setModalState] = useState(false);
  const [audioData, setAudioData] = useState();
  const { isLoading, error, sendRequest } = useHttpClient();
  const lid = useParams().lid;
  const tokenCtx = useContext(TokenContent)
  const music = useContext(MusicContent)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${lid}`, {
          headers: {
            Authorization: `Bearer ${music.code}`
          }
        })
        setFetchedMusic(data)
      } catch (e) {
        console.log(e)
      }
    };

    fetchedData();
  }, []);

  const dataOnModal = (data) => {
    setModalState(true);
    document.body.style.overflow = "hidden";
    setAudioData(data);
  };

  const dataOffModal = () => {
    setModalState(false);
    document.body.style.overflow = "scroll";
  };

  const firstClick = () => {
    navigate(-1);
  };

  const secondClick = async () => {
    console.log(tokenCtx.token)
    try {
      await sendRequest(
        "/api/favorite",
        "POST",
        JSON.stringify({
          id: fetchedMusic?.id,
          src: fetchedMusic?.images[0].url,
          name: fetchedMusic?.name,
          userId: tokenCtx?.token?.findUser?._id ? tokenCtx?.token?.findUser?._id : tokenCtx?.token?.user?._id
        }),
        { "Content-Type": "application/json" }
      );
      console.log(tokenCtx.token)
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <>
      {modalState && !!audioData && (
        <Modal bgImg={audioData.bgImg}>
          <ModalAudio data={audioData} onClick={dataOffModal} />
        </Modal>
      )}

      <div className={classes.bgContainer}>
        <ButtonsDiv
          firstType="back"
          secondType="fav"
          firstClick={firstClick}
          secondClick={secondClick}
        />
        <LidBackground src={fetchedMusic?.images[0].url} />
      </div>
      <Pcard>
        {error && <h1>Cant Find Data :/</h1>}
        {isLoading && !error && <LoadingSpinner asOverlay />}
        {!error && !isLoading && (
          <>
            <LidDescr
              // STATT LIST fetchedMusic
              followers={fetchedMusic?.followers.total}
              name={fetchedMusic?.name}
              description={fetchedMusic?.description}
            />
            <LidTrackList
              onClick={dataOnModal}
              tracks={fetchedMusic?.tracks.items}
            />
          </>
        )}
      </Pcard>

      <Footer />
    </>
  );
};

export default MusicList;
