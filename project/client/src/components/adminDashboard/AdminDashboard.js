import React from "react";

//icons
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

// scss
import "../../scss/adminDashboard.scss";
import AddStudentSection from "./StudentSection";
import BestSportStudent from "./BestSportStudent";
import Chart from "./Chart";

const AdminDashboard = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="adminDashboard">
      <h2>
        Welcome <span>{user.userName}</span>
      </h2>
      <div className="dataSection">
        <div className="dashboard-sections">
          <div className="section">
            <div className="section-left">
              <div className="section-top">
                {/* student box */}
                <div className="box">
                  <div className="content">
                    <h3>Number of Students</h3>
                    <h3 className="box-number">22 crore +</h3>
                  </div>
                  <div className="icon">
                    <FaUserGraduate className="box-icon" />
                  </div>
                </div>
                {/* teacher box  */}
                <div className="box">
                  <div className="content">
                    <h3>Number of Teachers</h3>
                    <h3 className="box-number">1 trillion +</h3>
                  </div>
                  <div className="icon">
                    <FaChalkboardTeacher className="box-icon" />
                  </div>
                </div>
              </div>
              {/* bottom section  */}
              <div className="section-bottom">
                {" "}
                <Chart />{" "}
              </div>
            </div>

            {/* right section  */}
            <div className="section-right">
              <div className="boxContainer">
                <div className="box">
                  <AddStudentSection />
                </div>
                <div className="box ">
                  <BestSportStudent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
