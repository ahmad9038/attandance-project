import React, { useEffect, useState } from "react";

// scss
import "../scss/classes.scss";
import Sidebar from "../components/Sidebar";
import { FaPlus } from "react-icons/fa"; // Import the add icon
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useClassContext } from "../context/ClassContext";
import AddClassModal from "../components/AddClassModal";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import EditClassModal from "../components/EditClassModal";
import axios from "axios";
import ConfirmationModal from "../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";

const MAX_BUTTONS = 2;

const Classes = () => {
  const navigate = useNavigate();
  const { searchedText, searchedClasses, allClasses } = useClassContext();

  // when we edit the class
  const [selectedClass, setSelectedClass] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to navigate to the "Attendance" page
  const goToAttendancePage = (classId) => {
    navigate(`/attendance/${classId}`);
  };

  // State to manage the confirmation modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Function to open the confirmation modal
  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  // Function to close the confirmation modal
  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  //if we search something then automatically we are on the 1st page again
  useEffect(() => {
    setCurrentPage(1);
  }, [searchedText]);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedClasses.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(searchedClasses.length / itemsPerPage);
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Calculate the range of pagination buttons
  const middleButton = Math.floor(MAX_BUTTONS / 2);
  const startPage = Math.max(currentPage - middleButton, 1);
  const endPage = Math.min(
    startPage + MAX_BUTTONS - 1,
    Math.ceil(searchedClasses.length / itemsPerPage)
  );

  //modal controls
  const [modalType, setModalType] = useState(null);
  const openModal = (modalType) => {
    setIsModalOpen(true);
    setModalType(modalType);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="classes">
      <Sidebar />
      <div className="mainContent">
        <div className="custom-navbar">
          <div className="left">
            <div className="search-bar">
              <input
                onChange={(event) => searchedText(event)}
                type="text"
                placeholder="Search classes"
              />
            </div>
            <div className="class-count">
              <span>Total Classes: {allClasses.length}</span>
              <span>Classes Found: {searchedClasses.length}</span>
            </div>
          </div>

          <div className="add-class-button">
            <button onClick={() => openModal("add")}>
              <FaPlus /> Add Class
            </button>
          </div>
        </div>
        <div className="class-list">
          <table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Room Number</th>
                <th>Total Students</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through your classes data and render each row */}
              {currentItems.map((cur) => (
                <tr key={cur._id}>
                  {" "}
                  {/* You should also provide a unique key */}
                  <td>{cur.name}</td>
                  <td>{cur.roomNumber}</td>
                  <td>{cur.students.length}</td>
                  <td className="Icons">
                    <button
                      onClick={() => {
                        openModal("edit", cur);
                        setSelectedClass(cur);
                      }}
                      className="edit-button"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        openModal(openConfirmModal, cur);
                        setSelectedClass(cur);
                      }}
                      className="edit-button"
                    >
                      <AiFillDelete />
                    </button>

                    <button
                      onClick={() => goToAttendancePage(cur._id)}
                      className="edit-button"
                    >
                      <FaUserGroup />
                    </button>
                  </td>
                </tr>
              ))}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
        {/* Pagination controls */}
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="pagination-icon-button"
            disabled={currentPage === 1}
          >
            <MdArrowBackIosNew />
          </button>
          {searchedClasses.length > itemsPerPage &&
            Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
              <button
                key={startPage + index}
                onClick={() => paginate(startPage + index)}
                className={`pagination-button ${
                  currentPage === startPage + index ? "active" : ""
                }`}
              >
                {startPage + index}
              </button>
            ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            className="pagination-icon-button"
            disabled={
              currentPage === Math.ceil(searchedClasses.length / itemsPerPage)
            }
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>

      {modalType === "add" && (
        <AddClassModal isOpen={isModalOpen} onClose={closeModal} />
      )}
      {modalType === "edit" && (
        <EditClassModal
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}

      <ConfirmationModal
        selectedClass={selectedClass}
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
      />
    </div>
  );
};

export default Classes;
