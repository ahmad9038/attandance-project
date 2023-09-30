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
import "../scss/addClassModal.scss";
import axios from "axios";

//icons
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useClassContext } from "../context/ClassContext";

//material ui
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";

const AddClassModal = ({ isOpen, onClose }) => {
  const { refresh } = useClassContext();
  const [loading, setLoading] = useState(false);
  //time setting
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState(/* initial value here */);

  useEffect(() => {
    setTimeFrom("");
    setTimeTo("");
  }, [onClose]);

  //handle search **********
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

  //handle selected users
  const [selectedStudents, setSelectedStudents] = useState([]);

  const addUsers = (userToAdd) => {
    if (selectedStudents.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedStudents([...selectedStudents, userToAdd]);
  };

  const removeUsers = (userToRemove) => {
    setSelectedStudents(
      selectedStudents.filter((sel) => sel._id !== userToRemove._id)
    );
  };

  const [className, setClassName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const createNewClass = async () => {
    if (
      !className ||
      !selectedStudents ||
      selectedStudents.length === 0 ||
      !roomNumber ||
      !timeFrom ||
      !timeTo
    ) {
      toast({
        title: "Fill all fields",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      console.log(JSON.stringify(selectedStudents.map((cur) => cur._id)));
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:5000/class/createClass`,
        {
          name: className,
          roomNumber: roomNumber,
          students: selectedStudents.map((cur) => cur._id),
          timeFrom: timeFrom,
          timeTo: timeTo,
        }
      );

      console.log(data);

      setSearchResults([]);
      setSelectedStudents([]);
      setClassName("");
      setRoomNumber("");

      setLoading(false);
      refresh();
      //reset all timer
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent className="add-class-modal">
          {" "}
          {/* Apply your SCSS class */}
          <ModalHeader>Add Class</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="modal-body">
            {" "}
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
                        <button onClick={() => addUsers(cur)}>
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
                {selectedStudents.map((cur) => (
                  <li key={cur.id}>
                    {cur.userName} - {cur.rollNo}
                    <button onClick={() => removeUsers(cur)}>
                      <AiOutlineMinus />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="selected-count">
                Students Added: {selectedStudents.length}
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
                onClick={createNewClass}
                colorScheme="blue"
                isDisabled={loading}
              >
                {loading ? <Spinner color="white" /> : "Add Class"}
              </Button>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddClassModal;
