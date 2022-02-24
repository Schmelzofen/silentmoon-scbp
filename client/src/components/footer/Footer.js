import { NavLink } from "react-router-dom";
import SmallTag from "./SmallTag";

import { AiOutlineHome } from "react-icons/ai";
import { GiMeditation } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <ul>
        <li>
          <NavLink
            to={"/breath"}
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            <div className={classes.iconT}>
              <GiMeditation />
              <SmallTag text={"Breathe"} />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favs"}
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            <div className={classes.iconT}>
              <MdFavoriteBorder />
              <SmallTag text={"Favorites"} />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/home"}
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            <div className={classes.iconT}>
              <AiOutlineHome />
              <SmallTag text={"Home"} />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/profile"}
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            <div className={classes.iconT}>
              <CgProfile />
              <SmallTag text={"Profile"} />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/premium"}
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            <div className={classes.iconT}>
              <BsCurrencyDollar />
              <SmallTag text={"Premium"} />
            </div>
          </NavLink>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
