import { useNavigate } from "react-router-dom";
import ButtonsDiv from "../../components/UI/buttons/ButtonsDiv";
import LinkButtonStart from "../../components/UI/buttons/LinkButtonStart";
import LoginForm from "../../components/form/Forms/LoginForm";

import classes from "./Sign.module.css";

const SignIn = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.container}>
      <h1>Welcome Back!</h1>
      <ButtonsDiv firstType="back" firstClick={navigateHandler} />
      <LoginForm />
      <div className={classes.small}>
        <p>No account yet?</p>
        <LinkButtonStart to="/signup" styleName="small" text="Sign up" />
      </div>
    </div>
  );
};

export default SignIn;
