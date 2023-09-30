import React from "react";

//ioons
import {
  FaChartBar,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
} from "react-icons/fa";

//scss
import "../scss/sideBar.scss";

//logo
import logo from "../img/logo.png";

const Sidebar = ({ selectedRole }) => {
  return (
    <div className="sideBar">
      <div className="logo">
        <img src={logo} alt="NUML logo" />
        <span className="logo-name">NUML</span>
      </div>
      <div className="heading">{selectedRole} Main Menu</div>
      <ul className="options">
        <li>
          <FaChartBar className="option-icon" />
          Dashboard
        </li>
        <li>
          <FaUserGraduate className="option-icon" />
          Student List
        </li>
        <li>
          <FaChalkboardTeacher className="option-icon" />
          Teacher List
        </li>
        <li>
          <FaBook className="option-icon" />
          Classes
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
