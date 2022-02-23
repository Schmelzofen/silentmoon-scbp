import Buttons from "./Buttons";

import classes from "./ButtonsDiv.module.css";

const ButtonsDiv = (props) => {
  return (
    <div className={classes.buttonDiv}>
      {props.firstType && (
        <Buttons type={props.firstType} onClick={props.firstClick} />
      )}
      {props.secondType && (
        <Buttons type={props.secondType} onClick={props.secondClick} />
      )}
    </div>
  );
};

export default ButtonsDiv;
