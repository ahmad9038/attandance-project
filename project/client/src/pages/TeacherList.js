import React, { useState } from "react";
import "../scss/teacherList.scss";
import Sidebar from "../components/Sidebar";
import { useTeacherContext } from "../context/TeacherContext";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const MAX_BUTTONS = 2;

const TeacherList = () => {
  const { filteredTeachers, searchedText, searchBy } = useTeacherContext();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTeachers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Calculate the range of pagination buttons
  const middleButton = Math.floor(MAX_BUTTONS / 2);
  const startPage = Math.max(currentPage - middleButton, 1);
  const endPage = Math.min(
    startPage + MAX_BUTTONS - 1,
    Math.ceil(filteredTeachers.length / itemsPerPage)
  );

  return (
    <div className="teacherList">
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
              <option value="department">Search by Department</option>
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
              <th className="col-department">Department</th>
              <th className="col-semester">Phone</th>
              <th className="col-email">Email</th>
              <th className="col-registeredAt">Registered At</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((cur, index) => (
              <tr className="dataRow" key={index}>
                <td className="col-userName">{cur.userName}</td>
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
          {filteredTeachers.length > itemsPerPage &&
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
              currentPage === Math.ceil(filteredTeachers.length / itemsPerPage)
            }
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
