import React, { useState } from "react";
import { Avatar } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai"; // Import the search icon
import "../scss/navbar.scss";
import ProfileModal from "./ProfileModal";

const NavBar = ({ selectedRole, user, fetchUserData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="navbar">
      <div className="search-wrapper">
        <input type="text" placeholder="Search" className="search-input" />
        <div className="search-icon">
          <AiOutlineSearch />
        </div>
      </div>
      <div className="user-profile">
        <Avatar
          className="avatar"
          src="user-image.jpg"
          name={user.userName}
          size="md"
          onClick={openModal}
        />
        <div className="user-details">
          <span className="user-name">{user.userName}</span>
          <span className="user-role">{selectedRole}</span>
        </div>
      </div>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={user}
        selectedRole={selectedRole}
        fetchUserData={fetchUserData}
      />
    </div>
  );
};

export default NavBar;
