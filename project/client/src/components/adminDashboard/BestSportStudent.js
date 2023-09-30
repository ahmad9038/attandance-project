import React from "react";
import { AiFillEdit } from "react-icons/ai";

// scss
import "../../scss/bestSportStudent.scss";

const AdminBestSportStudent = () => {
  return (
    <div className="adminBestSportStudent">
      <div className="top-section">
        <div className="left-section">
          <span className="heading">Best Esport Students</span>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="bottom-section">
        {/* student container  */}
        <div className="studentContainer">
          <div className="studentData">
            <span className="student-name">1st Place in Tekken</span>
            <span className="student-department">
              Idiot won 1st place in Tekken
            </span>
          </div>
          <div className="day">
            <h3>1 day ago</h3>
          </div>
        </div>
        <hr />
        <div className="studentContainer">
          <div className="studentData">
            <span className="student-name">1st Place in Tekken</span>
            <span className="student-department">
              Idiot won 1st place in Tekken
            </span>
          </div>
          <div className="day">
            <h3>1 day ago</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBestSportStudent;
