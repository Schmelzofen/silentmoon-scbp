import classes from "./SmallTag.module.css";

const SmallTag = (props) => {
  return <span className={classes.text}>{props.text}</span>;
};

export default SmallTag;
