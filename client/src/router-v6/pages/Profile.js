import Logo from "../../components/UI/Logo";
import Pcard from "../../components/UI/Pcard";
import ProfilePic from "../../components/UI/profile/ProfilePic";
import Footer from "../../components/footer/Footer";
import ProfileContent from "../../components/UI/profileContent/ProfileContent";
import classes from "./Profile.module.css"

import React, { useState } from "react"

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticTimePicker from '@mui/lab/StaticTimePicker';

const Profile = () => {
  const [style, setStyle] = useState("")
  const [style2, setStyle2] = useState("")
  const [style3, setStyle3] = useState("")
  const [style4, setStyle4] = useState("")
  const [style5, setStyle5] = useState("")
  const [style6, setStyle6] = useState("")
  const [style7, setStyle7] = useState("")
  const [value, setValue] = useState(new Date())

  const buttonStyle = {
    backgroundColor: "white",
    border: "1px solid #e28f83",
    color: "#e28f83"
  }
  const buttonStyle2 = {
    backgroundColor: "#e28f83"
  }
  return (
    <><>
      <Logo />
      <>
        <ProfilePic />
        <ProfileContent />
        <div className={classes.meditate}>
          <h1>Pick a time to meditate</h1>
          <div className={classes.container}>
            <button onClick={() => setStyle2(!style2)}
              style={(style2) ? buttonStyle : buttonStyle2}
            >M</button>
            <button onClick={() => setStyle3(!style3)}
              style={(style3) ? buttonStyle : buttonStyle2}
            >T</button>
            <button onClick={() => setStyle4(!style4)}
              style={(style4) ? buttonStyle : buttonStyle2}
            >W</button>
            <button onClick={() => setStyle5(!style5)}
              style={(style5) ? buttonStyle : buttonStyle2}
            >TH</button>
            <button onClick={() => setStyle6(!style6)}
              style={(style6) ? buttonStyle : buttonStyle2}
            >F</button>
            <button onClick={() => setStyle7(!style7)}
              style={(style7) ? buttonStyle : buttonStyle2}
            >S</button>
            <button onClick={() => setStyle(!style)}
              style={(style) ? buttonStyle : buttonStyle2}
            >SU</button>
          </div>
        </div>
        <div className="timePicker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticTimePicker
              displayStaticWrapperAs="mobile"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </><Footer /></>
    </>
  );
};

export default Profile;
