import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import TokenContent from "../../../store/token-provider";
import classes from "./LoginForm.module.css";

const SignupForm = () => {
  const authCtx = useContext(TokenContent);
  const [file, setFile] = useState(false)
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

          console.log("LOOK HERE", file, data)
          console.log(data.picture);
          console.log(data.picture.length)
          authCtx.signup(data, file);
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
        <div className={classes.uploadPicture}>
          <label className="btn btn-default btn-sm center-block btn-file">
            <p><i className="fa fa-upload fa-2x" aria-hidden="true">{file ? <span className={classes.upload}>{file}</span> : <span className={classes.upload}>Upload a picture!</span>}</i></p>
            <input
                /*ref={register}*/ {...register("picture")}
              type="file" /*name="picture"*/
              onChange={(e) => setFile(e.target.files[0].name)}
              accept="image/png, image/gif, image/jpeg"
            />
          </label>
        </div>
        <input type="submit" value="SEND" />
      </form>
    </>
  );
};

export default SignupForm;
