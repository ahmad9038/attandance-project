import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Toast,
  useToast,
  Spinner,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
// scss
import "../scss/editClassModal.scss";

//material ui
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useClassContext } from "../context/ClassContext";

const EditClassModal = ({
  isOpen,
  onClose,
  selectedClass,
  setSelectedClass,
}) => {
  const { refresh } = useClassContext();
  const [loading, setLoading] = useState(false);

  //time setting
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState(/* initial value here */);

  function formatTimeFromTimestamp(timestamp) {
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  }

  // time table ******

  // **************************************************fetch student data
  const [classStudents, setClassStudents] = useState([]);
  const fetchStudentsData = async () => {
    if (!selectedClass) return;

    try {
      const chatIds = selectedClass.students;
      const chatIdsString = chatIds.join(",");
      const { data } = await axios.get(
        `http://localhost:5000/class/fetchClassStudentsData/${chatIdsString}`
      );
      setClassStudents(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchStudentsData();
  }, [isOpen]);

  console.log(selectedClass.fromAmPM);

  //handle search
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/class/searchStudents?search=${search}`
        // Use the 'query' parameter here, not 'search'
      );
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  //delete users
  const [usersToDelete, setUsersToDelete] = useState([]);
  const handleRemoveStudents = (student) => {
    const updatedClassStudents = classStudents.filter(
      (cur) => cur._id !== student._id
    );
    setUsersToDelete([...usersToDelete, student]);
    setClassStudents(updatedClassStudents);
  };

  //add user

  const [addedUser, SetAddedUsers] = useState([]);
  const handleAddStudents = (student) => {
    if (classStudents.find((u) => u._id === student._id)) {
      toast({
        title: "user already added",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setClassStudents([...classStudents, student]);
    SetAddedUsers([...addedUser, student]);
  };

  const [className, setClassName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  //update*************
  const update = async () => {
    setLoading(true);
    const { data } = await axios.put(`http://localhost:5000/class/updateData`, {
      selectedClassId: selectedClass._id,
      studentId: classStudents.map((cur) => cur._id),
      addedUser: addedUser,
      usersToDelete,
      className: className,
      roomNumber: roomNumber,
      //times
      timeTo: timeTo,
      timeFrom: timeFrom,
    });

    SetAddedUsers([]);
    setUsersToDelete([]);
    refresh();
    setLoading(false);
    setClassName("");
    setRoomNumber("");

    //reset all timer

    //close the modal
    onClose();
  };

  console.log(addedUser);

  //handle selected users
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [selectedTime, setSelectedTime] = useState(new Date()); // Initialize with the current time

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  console.log(usersToDelete.length);
  const [valuesUpdated, setValuesUpdated] = useState(false);
  useEffect(() => {
    if (
      className !== "" ||
      roomNumber !== "" ||
      usersToDelete.length !== 0 ||
      addedUser.length !== 0 ||
      timeFrom !== undefined ||
      timeTo !== undefined
    ) {
      setValuesUpdated(true);
    } else {
      setValuesUpdated(false);
    }
  }, [timeFrom, className, roomNumber, usersToDelete, addedUser]);

  useEffect(() => {
    setTimeFrom(undefined);
    setTimeTo(undefined);
    setClassName("");
    setRoomNumber("");
  }, [onclose]);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent className="edit-class-modal">
          {" "}
          {/* Apply your SCSS class */}
          <ModalHeader>
            <div>Name: {selectedClass.name}</div>
            <div>Room: {selectedClass.roomNumber}</div>
            <div>
              {formatTimeFromTimestamp(selectedClass.timeFrom)} -{" "}
              {formatTimeFromTimestamp(selectedClass.timeTo)}
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="modal-body">
            {/* Apply your SCSS class */}
            <div className="left-section">
              <input
                placeholder="Search students..."
                onChange={(event) => handleSearch(event.target.value)}
              />
              {/* search results */}
              {!loading ? (
                searchResult.length > 0 ? (
                  <ul className="student-list">
                    {searchResult.slice(0, 4).map((cur) => (
                      <li key={cur.id}>
                        {cur.userName} - {cur.rollNo}
                        <button onClick={() => handleAddStudents(cur)}>
                          <AiOutlinePlus />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No students found.</p> // Alternate text when searchResult is empty
                )
              ) : (
                <Stack>
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                </Stack>
              )}
            </div>
            <div className="right-section">
              <input
                className="topInput"
                placeholder="Class Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
              <input
                className="topInput"
                type="number"
                placeholder="Room Number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
              <ul className="selected-students">
                {classStudents.map((cur) => (
                  <li key={cur._id}>
                    {cur.userName} - {cur.rollNo}
                    <button onClick={() => handleRemoveStudents(cur)}>
                      <AiOutlineMinus />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="selected-count">
                Students Added: {selectedClass.students.length}
              </div>
              <hr style={{ marginBottom: "10px" }} />
              {/* time table  */}
              <div>FROM</div>
              <div className="timetable-inputs">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField
                    style={{ width: "100%" }}
                    value={timeFrom}
                    onChange={(newValue) => setTimeFrom(newValue)}
                  />
                </LocalizationProvider>
              </div>

              <div>TO</div>
              <div className="timetable-inputs">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField
                    style={{ width: "100%" }}
                    value={timeTo}
                    onChange={(newValue) => setTimeTo(newValue)}
                  />
                </LocalizationProvider>
              </div>
              <Button
                style={{ width: "100%", marginTop: "30px" }}
                onClick={() => update()}
                colorScheme="blue"
                isDisabled={!valuesUpdated || loading}
              >
                {loading ? <Spinner color="white" /> : "Update"}
              </Button>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditClassModal;
