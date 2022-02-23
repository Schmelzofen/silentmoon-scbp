import Logo from "../../components/UI/Logo";
import Pcard from "../../components/UI/Pcard";
import ProfilePic from "../../components/UI/profile/ProfilePic";
import Footer from "../../components/footer/Footer";
import ProfileContent from "../../components/UI/profileContent/ProfileContent";
import React from 'react';
import classes from "./Profile.module.css"
import TimePicker from "../../components/time/Timepicker";

const Profile = () => {

  return (
    <>
      <Logo />
      <Pcard>
        <ProfilePic />
        <ProfileContent />
        <h1>Pick a time to meditate</h1>
        <div className={classes.container}>
          <button>SU</button>
          <button>M</button>
          <button>T</button>
          <button>W</button>
          <button>TH</button>
          <button>F</button>
          <button>S</button>
        </div>
        <div className="timePicker">
          <TimePicker />
        </div>
      </Pcard>
      <Footer />
    </>
  );
};

export default Profile;
