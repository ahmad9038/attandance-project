import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import MainPage from "./pages/MainPage";
import StudentList from "./pages/StudentList";
import TeacherList from "./pages/TeacherList";
import Classes from "./pages/Classes";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";
import Attendance from "./pages/Attendance";

const App = () => {
  return (
    <div className="App">
      <Router>
        {/* Include the Navbar component here */}
        <Routes>
          <Route path="/" element={<AccountPage />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/studentList" element={<StudentList />} />
          <Route path="/teacherList" element={<TeacherList />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/attendance/:id" element={<Attendance />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
