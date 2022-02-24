import TokenContent from "../../../store/token-provider";
import { useContext, useState } from "react"
import classes from "./ProfileContent.module.css"
import { Link } from "react-router-dom"
import { useHttpClient } from "../../../hooks/http-hook";
import { useNavigate } from "react-router-dom";

const ProfileContent = () => {
  const authCtx = useContext(TokenContent);
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [istGeschlossen, setzeIstGeschlossen] = useState(false)
  const { isLoading, error, sendRequest } = useHttpClient();
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const navigate = useNavigate();


  const triggerPasswordChange = () => {
    const changeDetails = async () => {
      try {
        const responseData = await sendRequest(
          "/auth/profile",
          "POST",
          JSON.stringify({
            _id: authCtx.token.findUser._id,
            oldPassword: oldPassword,
            passwort: password,
          }),
          { "Content-Type": "application/json" }
        );
        if (responseData && !error) {
          setIsCollapsed(!isCollapsed)
        }
      } catch (e) {
        console.log(e)
      }
    };
    changeDetails()
  }
  const triggerEmailChange = () => {
    const changeDetails = async () => {
      try {
        const responseData = await sendRequest(
          "/auth/profile",
          "POST",
          JSON.stringify({
            _id: authCtx.token.findUser._id,
            email: mail,
          }),
          { "Content-Type": "application/json" }
        );
        if (responseData && !error) {
          console.log(responseData)
          let oldmail = JSON.parse(localStorage.token)
          oldmail.findUser.email = mail
          localStorage.setItem("token", JSON.stringify(oldmail))
          console.log(JSON.stringify(localStorage))
          window.location.relaod()
        }
      } catch (e) {
        console.log(e)
      }
    };
    changeDetails()
  }

  return (
    <>
      <div className={classes.content}>
        <p>Your Mail: </p><span>{authCtx.token.findUser.email}</span>
      </div>
      <div className={classes.content}>
        <p>Subscription:</p><Link className={classes.link} to="/premium"><span className={classes.subscription}>FREE</span></Link>
      </div>
      <div className={classes.container}>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>change password</button>
        <button onClick={() => setzeIstGeschlossen(!istGeschlossen)}>change mail</button>
        {isCollapsed ?
          <div className={classes.inputContainer}>
            <input type="password" name="oldpw" placeholder="enter old password" onChange={(e) => setOldPassword(e.target.value)} />
            <input type="password" name="newpw" placeholder="enter new password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={triggerPasswordChange}>save</button>
          </div> :
          null}
        {istGeschlossen ?
          <div className={classes.inputContainer}>
            <input type="text" name="oldmail" readOnly value={authCtx.token.findUser.email} />
            <input type="text" name="newmail" placeholder="enter new email" onChange={(e) => setMail(e.target.value)} />
            <button onClick={triggerEmailChange}>save</button>
          </div> :
          null}
      </div>
    </>
  );
};

export default ProfileContent;