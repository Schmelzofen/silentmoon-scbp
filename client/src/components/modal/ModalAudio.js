import ButtonsDiv from "../UI/buttons/ButtonsDiv";

import classes from "./ModalAudio.module.css";

const ModalAudio = (props) => {
  const { data } = props;
  console.log(data.trackUlrl);
  return (
    <div className={classes.modalCont}>
      <ButtonsDiv
        firstType="close"
        secondType="fav"
        firstClick={props.onClick}
      />
      <div className={classes.context}>
        <h1>{data.artistName}</h1>
        <h3>{data.trackName}</h3>
        <div className={classes.control}>
          <audio controls>
            <source src={data.trackUlrl} type="audio/ogg" />
            <source src={data.trackUlrl} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
};

export default ModalAudio;
