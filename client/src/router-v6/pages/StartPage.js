import LinkButtonStart from "../../components/UI/buttons/LinkButtonStart";
import classes from "./Welcome.module.css";
import Photo from "../../icons/Frame.png";

const StartPage = () => {
  return (
    <>
      <div className={classes.container}>
        <h3 className={classes.logo}>SILENT MOON</h3>
        <img src={Photo} alt="welcome" />
        <h2>We are what we do</h2>
        <p className={classes.text}>
          Thousand of people are using silent moon for meditation and yoga
          classes.
        </p>
        <LinkButtonStart to="/signup" styleName="big" text="sign up" />
        <div className={classes.small}>
          <p>ALREADY HAVE AN ACCOUNT?</p>
          <LinkButtonStart to="/signin" styleName="small" text="log in" />
        </div>
      </div>
    </>
  );
};

export default StartPage;
