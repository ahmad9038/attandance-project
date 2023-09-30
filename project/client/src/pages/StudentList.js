import React, { useEffect, useState } from "react";
import "../scss/studentList.scss";
import Sidebar from "../components/Sidebar";
import { useStudentContext } from "../context/StudentContext";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const MAX_BUTTONS = 2; // Maximum number of pagination buttons to display

const StudentList = () => {
  const { filteredStudents, searchedText, searchBy } = useStudentContext();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchedText]);

  // Change page
  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Calculate the range of pagination buttons
  const middleButton = Math.floor(MAX_BUTTONS / 2);
  const startPage = Math.max(currentPage - middleButton, 1);
  const endPage = Math.min(
    startPage + MAX_BUTTONS - 1,
    Math.ceil(filteredStudents.length / itemsPerPage)
  );

  return (
    <div className="studentList">
      <Sidebar />

      <div className="main-content">
        <div className="sections">
          <div className="search-section">
            <input
              onChange={(event) => searchedText(event)}
              type="text"
              placeholder="Search by name or email"
              className="search-bar"
            />
            <select
              onClick={() => {
                searchBy();
              }}
              id="searchBy"
              className="search-options"
            >
              <option value="userName">Search by Name</option>
              <option value="rollNo">Search by Roll No</option>
              <option value="department">Search by Department</option>
              <option value="semester">Search by Semester</option>
              <option value="email">Search by Email</option>
              <option value="phone">Search by Phone</option>
              {/* Add more search options here */}
            </select>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th className="col-userName">User Name</th>
              <th className="col-rollNo">Roll No</th>
              <th className="col-department">Department</th>
              <th className="col-semester">Semester</th>
              <th className="col-semester">Phone</th>
              <th className="col-email">Email</th>
              <th className="col-registeredAt">Registered At</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((cur, index) => (
              <tr className="dataRow" key={index}>
                <td className="col-userName">{cur.userName}</td>
                <td className="col-rollNo">{cur.rollNo}</td>
                <td className="col-department">{cur.department}</td>
                <td className="col-semester">{cur.semester}</td>
                <td className="col-phone">{cur.phone}</td>
                <td className="col-email">{cur.email}</td>
                <td className="col-registeredAt">{cur.registeredAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="pagination-icon-button"
            disabled={currentPage === 1}
          >
            <MdArrowBackIosNew />
          </button>
          {filteredStudents.length > itemsPerPage &&
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
              currentPage === Math.ceil(filteredStudents.length / itemsPerPage)
            }
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
