import { Link } from "react-router-dom";
import classes from "./LinkButtonStart.module.css";
const LinkButtonStart = ({ to, text, styleName }) => {
  return (
    <Link to={to} className={classes[styleName]}>
      {text}
    </Link>
  );
};

export default LinkButtonStart;
