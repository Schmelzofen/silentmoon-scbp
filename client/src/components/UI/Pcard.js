// gia padding opws to home alla dn einai pantou tah to dw pou tha mpei
import classes from "./Pcard.module.css";
const Pcard = (props) => {
  return (
    <div
      className={`${classes.pcard} ${props.className ? props.className : ""}`}
    >
      {props.children}
    </div>
  );
};

export default Pcard;
