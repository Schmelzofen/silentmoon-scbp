import classes from "./FlexForFavs.module.css";

const FlexForFavs = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default FlexForFavs;
