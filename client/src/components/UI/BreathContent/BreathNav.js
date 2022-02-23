import { useState } from "react";
import { GiBiceps } from "react-icons/gi";
import { GiNightSleep } from "react-icons/gi";
import { ImBooks } from "react-icons/im";

import classes from "./Breath.module.css";

export default function BreathNav(props) {
  const [filterString, setSearchValue] = useState("workout");

  const filterHandler = (filterString) => {
    setSearchValue(filterString);
    props.onClick(filterString);
  };

  return (
    <nav className={classes.buttonCont}>
      <ul>
        <li>
          <button
            onClick={filterHandler.bind(null, "workout")}
            className={`${filterString === "workout" ? classes.active : ""}`}
          >
            <GiBiceps />
          </button>
          <span>Workout</span>
        </li>
        <li>
          <button
            onClick={filterHandler.bind(null, "sleep")}
            className={`${filterString === "sleep" ? classes.active : ""}`}
          >
            <GiNightSleep />
          </button>
          <span>Sleep</span>
        </li>
        <li>
          <button
            onClick={filterHandler.bind(null, "read")}
            className={`${filterString === "read" ? classes.active : ""}`}
          >
            <ImBooks />
          </button>
          <span>Read</span>
        </li>
      </ul>
    </nav>
  );
}
