import Logo from "../Logo";
import Pcard from "../Pcard";
import classes from "./Pro.module.css";
import { AiOutlineCheck } from "react-icons/ai";

const Premium = () => {
  return (
    <>
      <Logo />
      <Pcard>
        <h1>Premium Version</h1>
        <div className={classes.buyCont}>
          <a
            href="https://www.youtube.com/watch?v=_bSEfx6D8mA"
            target="_blank"
            rel="noreferrer noopener"
          // href="#"
          >
            BUY PREMIUM
          </a>

          <h2> Only $9.99 per Month - Cancel anytime.</h2>
          <p>
            <span>Terms and conditions apply.</span> 1 month free, not available
            for users who have already tried Premium.
          </p>
        </div>
        <ul className={classes.ul}>
          <li>
            <h2>Why The Premium Version</h2>
          </li>
          <li>
            <AiOutlineCheck />
            <p>Enjoy your favorite music offline</p>
          </li>
          <li>
            <AiOutlineCheck />
            <p>Much better sound quality (up to 320 Kb/s)</p>
          </li>
          <li>
            <AiOutlineCheck />
            <p>Access to user playlists</p>
          </li>
          <li>
            <AiOutlineCheck />
            <p>Listen to your music without ads</p>
          </li>
          <li>
            <AiOutlineCheck />
            <p>Listen to music even when the app is running in the background</p>
          </li>
        </ul>
      </Pcard>
    </>
  );
};

export default Premium;
