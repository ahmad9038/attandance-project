import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../scss/attendance.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const Attendance = () => {
  const [classData, setClassData] = useState({});
  const [studentsData, setStudentsData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classDataUrl = `http://localhost:5000/class/fetchSingleClass/${id}`;
        const classResponse = await axios.get(classDataUrl);

        // Set classData with the response data
        setClassData(classResponse.data[0]);

        // Extract student IDs from the class data
        const studentIds = classResponse.data[0].students;
        const studentIdsString = studentIds.join(",");

        // Fetch student data based on the student IDs
        const studentDataUrl = `http://localhost:5000/class/fetchClassStudentsData/${studentIdsString}`;
        const studentResponse = await axios.get(studentDataUrl);

        // Set studentsData with the student data response
        setStudentsData(studentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log(studentsData);

  return (
    <div className="attendance">
      <Sidebar />
      <div className="mainContent">
        <div className="custom-navbar">
          <div className="left">
            <div className="class-count">
              <span>Date {classData.totalClasses}</span>
              <span>{classData.name}</span>
              <span>Room No. {classData.roomNumber}</span>
            </div>
          </div>
          <div className="left">
            <div className="class-count">
              <span>Total Students: {studentsData.length}</span>
              <span>present students</span>
              <span>absent students</span>
            </div>
          </div>

          <div className="add-class-button"></div>
        </div>
        <div className="class-list">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Roll No.</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {studentsData.map((student, index) => (
              <tbody key={index}>
                <tr>
                  <td>{student.userName}</td>
                  <td>{student.rollNo}</td>
                  <td>
                    <button className="present">Present</button>
                  </td>
                  <td>
                    <button className="absent">Absent</button>
                  </td>
                  <td>
                    <button className="leave">Leave</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
