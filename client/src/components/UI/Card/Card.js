import { Link } from "react-router-dom";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <Link to={`/list/${props.to}`}>
      <div className={classes.card}>
        <img
          src={`${props.src
              ? props.src
              : "https://images.unsplash.com/photo-1552286450-4a669f880062?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            }`}
          alt="playList"
        />
        <h4>{`${props.name ? props.name : "Yoga"}`}</h4>
      </div>
    </Link>
  );
};

export default Card;
