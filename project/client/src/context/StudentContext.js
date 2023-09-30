import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import studentReducer from "../reducers/studentReducer";
const API = "http://localhost:5000/students";

const StudentContext = createContext();
const initialState = {
  isSingleLoading: false,
  allStudents: [],
  filteredStudents: [],
  isLoading: false,
  isError: false,
  searchedText: "",
  searchedBy: "userName",
};

const StudentProvider = ({ children }) => {
  // Corrected component name to start with an uppercase letter
  const [state, dispatch] = useReducer(studentReducer, initialState);

  const fetchAllUsers = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const students = await res.data;
      dispatch({ type: "SET_API_DATA", payload: students });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // useEffect
  useEffect(() => {
    fetchAllUsers(API);
  }, []);

  //filtering students ************************
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_USERS", payload: state.allStudents });
  }, [state.allStudents]);

  const searchedText = (event) => {
    const value = event.target.value;
    dispatch({ type: "SEARCHED_TEXT", payload: value });
  };

  // search the users
  useEffect(() => {
    dispatch({ type: "SEARCH_USERS" });
  }, [state.searchedText, state.searchedBy]);

  // set search by value
  const searchBy = () => {
    dispatch({ type: "SET_SEARCHBY_VALUE" });
  };

  return (
    <StudentContext.Provider value={{ ...state, searchedText, searchBy }}>
      {children}
    </StudentContext.Provider>
  );
};

const useStudentContext = () => {
  return useContext(StudentContext);
};

export { StudentProvider, useStudentContext };
