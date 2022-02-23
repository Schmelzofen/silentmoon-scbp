import TokenContent from "../../../store/token-provider";
import { useContext } from "react"
import classes from "./ProfileContent.module.css"

const ProfileContent = () => {
  const authCtx = useContext(TokenContent);
  console.log(authCtx)
  return (
    <>

      <div className={classes.content}>
        <h1>Your personal data</h1>
        <ul>
          <li>Name: {authCtx.token.findUser.name}</li>
          <li>Your Mail: {authCtx.token.findUser.email}</li>
          <li>Subscription: <span>FREE</span></li>
        </ul>
      </div>
      <div className={classes.container}>
        <button>change Password</button>
        <button>change Mail</button>
      </div>
    </>
  );
};

export default ProfileContent;