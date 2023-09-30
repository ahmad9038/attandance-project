import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Box, useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

//image
import logo from "../img/logo.png";

//scss
import "../scss/login.scss";
import StudentRegisterModal from "./StudentRegisterModal";

const Login = ({ selectedRole }) => {
  let URL = "";
  // checks who is going to login student, teacher or admin
  if (selectedRole === "Student") {
    URL = "http://localhost:5000/studentLogin";
  } else if (selectedRole === "Teacher") {
    URL = "http://localhost:5000/teacherLogin";
  } else if (selectedRole === "Admin") {
    URL = "http://localhost:5000/adminLogin";
  }

  // to open student modal when link clicked
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false, // Added showPassword state
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const toggleShowPassword = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const adminLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.error === "Enter All Info") {
      toast({
        description: "fill all fields",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    } else if (data.error || !data) {
      toast({
        description: "Invalid Credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        description: "Login SuccessFull",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      // localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/mainPage", { state: { selectedRole, userId: data._id } });
    }
  };

  return (
    <Box className="login" width={"100%"}>
      <div className="container">
        <h1 className="heading"> {selectedRole}</h1>
        <form method="POST">
          <div className="inputContainer">
            <input
              type="email"
              name="email"
              onChange={handleInputs}
              value={user.email}
              required
            />
            <label htmlFor="username">Email</label>
          </div>
          <div className="inputContainer passwordInput">
            <input
              type={user.showPassword ? "text" : "password"}
              name="password"
              onChange={handleInputs}
              value={user.password}
              required
            />
            <label htmlFor="password">Password</label>
            {user.showPassword ? (
              <BiShow className="eyeIcon" onClick={toggleShowPassword} />
            ) : (
              <BiHide className="eyeIcon" onClick={toggleShowPassword} />
            )}
          </div>
          <button onClick={adminLogin} type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : "Login"}
          </button>
        </form>
        <div className="registerText">
          {selectedRole === "Student" && (
            <div onClick={openModal} className="link">
              Don't have account? Register
            </div>
          )}
        </div>
        <div className="modal">
          <StudentRegisterModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </Box>
  );
};

export default Login;
