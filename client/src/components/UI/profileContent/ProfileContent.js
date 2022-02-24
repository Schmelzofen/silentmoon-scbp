import TokenContent from "../../../store/token-provider";
import { useContext, useState } from "react"
import classes from "./ProfileContent.module.css"
import { Link } from "react-router-dom"

const ProfileContent = () => {
  const authCtx = useContext(TokenContent);
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [istGeschlossen, setzeIstGeschlossen] = useState(false)

  return (
    <>

      <div className={classes.content}>
        <ul>
          <li>Your Mail: {authCtx.token.findUser.email}</li>
          <li>Subscription: <Link className={classes.link} to="/premium"><span className={classes.subscription}>FREE</span></Link></li>
        </ul>
      </div>
      <div className={classes.container}>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>change password</button>
        <button onClick={() => setzeIstGeschlossen(!istGeschlossen)}>change mail</button>
        {isCollapsed ?
          <div className={classes.inputContainer}>
            <input type="password" name="oldpw" placeholder="old password" />
            <input type="password" name="newpw" placeholder="new password" />
            <button>save</button>
          </div> :
          null}
        {istGeschlossen ?
          <div className={classes.inputContainer}>
            <input type="text" name="oldmail" placeholder="Your old email" />
            <input type="text" name="newmail" placeholder="Your new email" />
            <button>save</button>
          </div> :
          null}
      </div>
    </>
  );
};

export default ProfileContent;