import { useContext } from "react";
import { useForm } from "react-hook-form";
import TokenContent from "../../../store/token-provider";
import classes from "./LoginForm.module.css";

const SignupForm = () => {
  const authCtx = useContext(TokenContent);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data.picture);
          console.log(data.picture.length)
          authCtx.signup(data);
          //   if(errors.)
        })}
        className={classes.form}
      >
        <input
          {...register("name", { required: "Name is required." })}
          type="text"
          placeholder="NAME"
        />
        <p className={classes.error}>{errors.name?.message}</p>
        <input
          {...register("email", { required: "Email is required." })}
          type="email"
          placeholder="EMAIL"
        />
        {errors.email?.message && (
          <p className={classes.error}>{errors.email?.message}</p>
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
          <p className={classes.error}>{errors.passwort?.message}</p>
        )}
        <input
          /*ref={register}*/ {...register("picture")}
          type="file" /*name="picture"*/
        />
        <input type="submit" value="SEND" />
      </form>
    </>
  );
};

export default SignupForm;
