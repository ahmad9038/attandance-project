import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Avatar,
  useToast,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

//scss
import "../scss/profileModal.scss";

const ProfileModal = ({
  isOpen,
  onClose,
  user,
  selectedRole,
  fetchUserData,
}) => {
  const [editedSemester, setEditedSemester] = useState(user.semester);
  const [editedPhone, setEditedPhone] = useState(user.phone);
  const [editState, setEditState] = useState({});
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setEditedSemester(user.semester);
    setEditedPhone(user.phone);
    setEditState(false);
  }, [isOpen]);

  const handleEditState = (fieldName) => {
    setEditState({ ...editState, [fieldName]: !editState[fieldName] });
  };

  const update = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/updateStudent/${user._id}`, // Use route parameter
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            editedSemester,
            editedPhone,
          }),
        }
      );
      const data = await res.json();

      if (data.error === "invalid phone") {
        toast({
          description: "invalid phone number",
          status: "warning",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      } else if (data.error === "invalid semester number") {
        toast({
          description: "invalid phone number",
          status: "warning",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          description: "Updated",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        onClose();
        setLoading(false);
        fetchUserData();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //disbale the update button
  const [isModified, setIsModified] = useState(false); // Track whether there are modifications
  useEffect(() => {
    if (editedSemester !== user.semester || editedPhone !== user.phone) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [editedSemester, editedPhone, user.semester, user.phone]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent className="custom-modal-content">
          <ModalCloseButton icon={<AiOutlineCloseCircle />} size="lg" />
          <ModalBody>
            <div className="profile-modal">
              <div className="profile-header">
                <Avatar src="" name={user.userName} size="xl" />
                <h2 className="user-role">{selectedRole}</h2>
              </div>
              <div className="user-info">
                {/* set data according to roles  */}
                {selectedRole === "Student" && (
                  <>
                    <p>
                      <span className="info-label">User Name: </span>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={user.userName}
                        disabled={!editState["userName"]}
                        fullWidth
                      />
                      {/* {user.userName} */}
                    </p>
                    <p>
                      <span className="info-label">Roll No: </span>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={user.rollNo}
                        disabled={user.rollNo}
                        fullWidth
                      />
                    </p>
                    <p>
                      <span className="info-label">Department: </span>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={user.department}
                        disabled={user.department}
                        fullWidth
                      />
                    </p>
                    <p>
                      <span className="info-label">Semester: </span>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={editedSemester}
                        fullWidth
                        onChange={(e) => setEditedSemester(e.target.value)}
                        disabled={!editState["semester"]}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              edge="end"
                              onClick={() => handleEditState("semester")}
                            >
                              <EditIcon />
                            </IconButton>
                          ),
                        }}
                      />
                    </p>
                    <p>
                      <span className="info-label">Email: </span>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={user.email}
                        fullWidth
                        disabled={true}
                      />
                    </p>
                    <p>
                      <span className="info-label">Phone: </span>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={editedPhone}
                        fullWidth
                        onChange={(e) => setEditedPhone(e.target.value)}
                        disabled={!editState["phone"]}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              edge="end"
                              onClick={() => handleEditState("phone")}
                            >
                              <EditIcon />
                            </IconButton>
                          ),
                        }}
                      />
                    </p>
                  </>
                )}
                {selectedRole === "Teacher" && (
                  <>
                    <p>
                      <span className="info-label">User Name: </span>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={user.userName}
                      />
                    </p>
                    <p>
                      <span className="info-label">Department: </span>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={user.department}
                      />
                    </p>
                    <p>
                      <span className="info-label">Email: </span> {user.email}
                    </p>
                  </>
                )}
                {selectedRole === "Admin" && (
                  <>
                    <p>
                      <span className="info-label">User Name: </span>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={user.userName}
                      />
                    </p>
                    <p>
                      <span className="info-label">Email: </span>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        value={user.email}
                      />
                    </p>
                  </>
                )}
              </div>
              <div className="update-button">
                <Button
                  colorScheme="blue"
                  onClick={update}
                  isDisabled={isLoading || !isModified}
                  style={{ width: "100%" }}
                >
                  {isLoading ? <Spinner size="sm" /> : "Update"}
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
