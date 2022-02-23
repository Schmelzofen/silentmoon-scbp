import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Modal = (props) => {
  console.log(props);
  let testDiv = (
    <div
      className={classes.modal}
      style={{
        backgroundImage: `${
          props.bgImg
            ? `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
            url(${props.bgImg})`
            : `url("https://images.unsplash.com/uploads/14116941824817ba1f28e/78c8dff1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80")`
        }`,
      }}
    >
      {props.children}
    </div>
  );
  return ReactDOM.createPortal(testDiv, document.getElementById("modal"));
};

export default Modal;
