import { AiFillHeart } from "react-icons/ai";
import classes from "./LidDescr.module.css";

const LidDescr = (props) => {
  return (
    <div className={classes.textCard}>
      <h2>{`${props.name ? props.name : ""}`}</h2>
      <p>{`${props.description ? props.description : ""}`}</p>
      <div className={classes.follow}>
        <AiFillHeart />
        <span>{`${props.followers ? props.followers : "1124"} Followers`}</span>
      </div>
    </div>
  );
};

export default LidDescr;
