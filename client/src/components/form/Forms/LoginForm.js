import { useContext } from "react";
import LoadingSpinner from "../../UI/spinner/LoadingSpinner";
import { useForm } from "react-hook-form";
import TokenContent from "../../../store/token-provider";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const authCtx = useContext(TokenContent);
  // console.log(authCtx);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  return (
    <>
      {authCtx.isLoading && <LoadingSpinner asOverlay />}
      <form
        onSubmit={handleSubmit((data) => {
          authCtx.login(data);
        })}
        className={classes.form}
      >
        <input
          {...register("email", { required: "Email is required." })}
          type="email"
          placeholder="EMAIL"
        />
        {errors.email?.message && (
          <p className={classes.error}>{errors.email.message}</p>
        )}
        <input
          {...register("passwort", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6char.",
            },
          })}
          type="password"
          placeholder="PASSWORD"
        />
        {errors.passwort?.message && (
          <p className={classes.error}>{errors.passwort.message}</p>
        )}
        <input type="submit" value="SEND" />
      </form>
    </>
  );
};

export default LoginForm;
