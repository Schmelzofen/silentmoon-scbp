import classes from "./LidTrackList.module.css";
import { BiPlay } from "react-icons/bi";

const LidTrackList = ({ tracks, onClick }) => {
  const ulContent = tracks?.map((track, index) => {
    return (
      <li key={index}>
        <div>
          <button
            onClick={onClick.bind(null, {
              trackUlrl: track.track.preview_url,
              artistName: track.track.album.artists[0].name,
              bgImg: track.track.album.images[0].url,
              trackName: track.track.name,
            })}
          >
            <BiPlay />
          </button>
        </div>
        <div>
          <h5>{track.track.name}</h5>
          <p>{`${Math.ceil(track.track.duration_ms / 1000 / 60)} MIN`}</p>
        </div>
      </li>
    );
  });

  return (
    <>
      <h3>Playlist</h3>
      <ul className={classes.ul}>{ulContent}</ul>
    </>
  );
};

export default LidTrackList;
