import { useNavigate } from "react-router-dom";
import SignupForm from "../../components/form/Forms/SignupForm";
import ButtonsDiv from "../../components/UI/buttons/ButtonsDiv";
import classes from "./Sign.module.css";
const SignUp = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={classes.container}>
        <ButtonsDiv firstType="back" firstClick={navigateHandler} />
        <h1>Create your account</h1>
        <SignupForm />
      </div>
    </>
  );
};

export default SignUp;
