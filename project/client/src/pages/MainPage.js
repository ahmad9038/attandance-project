import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";

// scss
import "../scss/mainPage.scss";
import NavBar from "../components/NavBar";
import AdminDashboard from "../components/adminDashboard/AdminDashboard";

const MainPage = () => {
  const location = useLocation();
  const selectedRole = location.state?.selectedRole || "DefaultTab";
  const userId = location.state?.userId;

  const [user, setUser] = useState(null);

  // console.log(user.userName);

  let URL = ``;
  if (selectedRole === "Student") {
    URL = `http://localhost:5000/fetchStudentData/${userId}`;
  } else if (selectedRole === "Teacher") {
    URL = `http://localhost:5000/fetchTeacherData/${userId}`;
  } else {
    URL = `http://localhost:5000/fetchAdminData/${userId}`;
  }

  const fetchUserData = () => {
    axios
      .get(URL)
      .then((response) => {
        setUser(response.data); // Set user information in state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    // Fetch user information using Axios
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  console.log(user);

  return (
    <div className="mainPage">
      <Sidebar selectedRole={selectedRole} />
      <div className="main-content">
        <NavBar
          selectedRole={selectedRole}
          user={user}
          fetchUserData={fetchUserData}
        />
        <AdminDashboard user={user} />
      </div>
    </div>
  );
};

export default MainPage;
