import { useContext } from "react";
import TokenContent from "../../../../store/token-provider";
import { RiLogoutCircleLine } from "react-icons/ri";
import classes from "./LogoutButton.module.css";

const LogoutButton = () => {
  const tkCtx = useContext(TokenContent);
  
  return (
    <div className={classes.container}>
      <button
        onClick={() => {
          tkCtx.logout();
        }}
      >
        <RiLogoutCircleLine />
      </button>
      <span>Logout</span>
    </div>
  );
};

export default LogoutButton;