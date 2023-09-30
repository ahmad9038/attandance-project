import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Box,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

// SCSS
import "../scss/studentRegisterModal.scss";

const StudentRegisterModal = ({ isOpen, onClose }) => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    phone: "",
    rollNo: "",
    password: "",
    confirmPassword: "",
    department: "",
    gender: "",
    semester: "",
    showPassword: false, // Added showPassword state
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "phone" && value.length > 11) {
      value = value.slice(0, 11);
    }

    if (name === "rollNo" && value.length > 3) {
      value = value.slice(0, 3);
    }

    if (name === "userName" && value.length > 22) {
      value = value.slice(0, 22);
    }

    setUser({ ...user, [name]: value });
  };

  // register user
  const registerUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    const {
      userName,
      email,
      phone,
      rollNo,
      password,
      confirmPassword,
      department,
      gender,
      semester,
    } = user;
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        phone,
        rollNo,
        password,
        confirmPassword,
        department,
        gender,
        semester,
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.error) {
      toast({
        description: data.error,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        description: "Registeration successful",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Register
          <MdClose
            style={{
              float: "right",
              cursor: "pointer",
            }}
            onClick={onClose}
          />
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="input-container">
              <input
                onChange={handleInputs}
                type="text"
                name="userName"
                value={user.userName}
                placeholder="User Name"
              />
            </div>
            <div className="input-container">
              <input
                onChange={handleInputs}
                name="email"
                value={user.email}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="input-container">
              <input
                name="phone"
                value={user.phone}
                onChange={handleInputs}
                type="number"
                placeholder="Phone"
              />
            </div>
            <div className="input-container">
              <input
                name="rollNo"
                value={user.rollNo}
                onChange={handleInputs}
                type="text"
                placeholder="Roll Number"
              />
            </div>
            <div className="input-container">
              <input
                onChange={handleInputs}
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
              />
            </div>
            <div className="input-container">
              <input
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInputs}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="genderSelectInput">
              <select
                name="department"
                value={user.department}
                onChange={handleInputs}
              >
                <option value="" disabled selected>
                  Department
                </option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="English">English</option>
              </select>

              <div className="select">
                <select
                  name="gender"
                  value={user.gender}
                  onChange={handleInputs}
                >
                  <option value="" disabled selected>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <select
                  name="semester"
                  value={user.semester}
                  onChange={handleInputs}
                >
                  <option value="" disabled selected>
                    Semester
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={registerUser}
            colorScheme="green"
            ml={3}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Register"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StudentRegisterModal;
