import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

//scss
import "../scss/signup.scss";

const Signup = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const toggleShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };

  const toggleShowConfirmPassword = () => {
    setUser({
      ...user,
      showConfirmPassword: !user.showConfirmPassword,
    });
  };

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  // fetch data from backend
  const postData = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { userName, email, phone, password, confirmPassword } = user;
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        phone,
        password,
        confirmPassword,
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
      });
    } else if (data.error === "Email Already Exists") {
      toast({
        description: "Email already exists",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else if (data.error || !data) {
      toast({
        description: "password not matching",
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
      navigate("/chat");
    }
  };

  return (
    <>
      <div className="signup">
        <div className="container">
          <h1>Create an Account</h1>
          <form method="POST">
            <div className="inputContainer">
              <input
                value={user.userName}
                type="text"
                name="userName"
                onChange={handleInputs}
                required
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="inputContainer passwordInput">
              <input
                value={user.password}
                type={user.showPassword ? "text" : "password"}
                name="password"
                onChange={handleInputs}
                required
              />
              <label htmlFor="password">Password</label>
              {user.showPassword ? (
                <BiShow
                  className="eyeIcon"
                  onClick={toggleShowPassword} // Toggle showPassword state on icon click
                />
              ) : (
                <BiHide
                  className="eyeIcon"
                  onClick={toggleShowPassword} // Toggle showPassword state on icon click
                />
              )}
            </div>

            <div className="inputContainer passwordInput">
              <input
                value={user.confirmPassword}
                type={user.showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleInputs}
                required
              />
              <label htmlFor="password">Confirm Password</label>
              {user.showConfirmPassword ? (
                <BiShow
                  className="eyeIcon"
                  onClick={toggleShowConfirmPassword} // Toggle showPassword state on icon click
                />
              ) : (
                <BiHide
                  className="eyeIcon"
                  onClick={toggleShowConfirmPassword} // Toggle showPassword state on icon click
                />
              )}
            </div>

            <div className="inputContainer">
              <input
                value={user.email}
                type="email"
                name="email"
                onChange={handleInputs}
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="inputContainer">
              <input
                value={user.phone}
                type="number"
                name="phone"
                onChange={handleInputs}
                required
              />
              <label htmlFor="phone">Phone</label>
            </div>
            <button onClick={postData} type="submit" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" /> : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
