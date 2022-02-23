import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BsSuitHeart } from "react-icons/bs";

import classes from "./Buttons.module.css";

const Buttons = (props) => {
  if (props.type === "back") {
    return (
      <button
        className={`${classes.button} ${classes.back}`}
        onClick={props.onClick}
      >
        <AiOutlineArrowLeft />
      </button>
    );
  }
  if (props.type === "close") {
    return (
      <button
        className={`${classes.button} ${classes.close}`}
        onClick={props.onClick}
      >
        <AiOutlineClose />
      </button>
    );
  }
  if (props.type === "fav") {
    return (
      <button
        className={`${classes.button} ${classes.fav}`}
        onClick={props.onClick}
      >
        <BsSuitHeart />
      </button>
    );
  }
};

export default Buttons;
