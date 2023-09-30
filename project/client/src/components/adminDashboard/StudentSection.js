import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { Avatar } from "@chakra-ui/react";

// scss
require("../../scss/studentSection.scss");

const AddStudentSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="addStudentSection">
      {/* Top Section */}
      <div className="top-section">
        <div className="left-section">
          <span className="heading">Students</span>
        </div>
        <div className="right-section">
          <IoIosAdd className="add-icon" onClick={openModal} />
        </div>
      </div>
      {/* Bottom Section */}
      <div className="bottom-section">
        {/* student container */}
        <div className="studentContainer">
          <div className="studentData">
            <Avatar name="John Doe" src="user-image.jpg" size="sm" />
            <span className="student-name">John Doe</span>
          </div>
          <div className="edit-icon">
            <AiFillEdit className="edit-icon-circle" />
          </div>
        </div>
      </div>

      {/* Use the modal component */}
    </div>
  );
};

export default AddStudentSection;
