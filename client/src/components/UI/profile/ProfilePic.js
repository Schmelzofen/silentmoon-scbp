import { useContext, useState, useEffect } from "react";
import TokenContent from "../../../store/token-provider";
import classes from "./ProfilePic.module.css";
import LogoutButton from "./LogoutButton/LogoutButton";
import { useHttpClient } from "../../../hooks/http-hook";
import Resizer from "react-image-file-resizer"

const ProfilePic = (props) => {
  const [file, setFile] = useState(null)
  const tokenCtx = useContext(TokenContent);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [newPic, setNewPic] = useState(tokenCtx.token.findUser.image)
  useEffect(() => {
    const changeDetails = async () => {
      try {
        Resizer.imageFileResizer(file, 200, 200, "JPEG", 100, 0, async (uri) => {
          const responseData = await sendRequest(
            "/auth/profile",
            "POST",
            JSON.stringify({
              _id: tokenCtx.token.findUser._id,
              picture: uri,
            }),
            { "Content-Type": "application/json" }
          );
          if (responseData && !error) {
            setNewPic(uri)
          }
        }, "base64", 200, 200)
      } catch (e) {
        console.log(e)
      }
    };
    changeDetails()
  }, [error, file, sendRequest, tokenCtx.token.findUser, tokenCtx.token.findUser._id])


  return (
    <div className={classes.container}>
      <div className={classes.uploadImageContainer}>
        <label htmlFor="picture" className="btn btn-default btn-sm center-block btn-file">
          <img
            src={`${newPic ? newPic : tokenCtx?.token?.findUser?.image}`}
            alt="face"
          />
          <input type="file" name="picture" onChange={(e) => {
            setFile(e.target.files[0])
          }} />
        </label>
      </div>
      <h1>{`${tokenCtx?.token?.user?.name ? tokenCtx?.token?.user?.name : tokenCtx?.token?.findUser?.name}`}</h1>
      <LogoutButton />
    </div>
  );
};



export default ProfilePic;
