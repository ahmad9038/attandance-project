import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import teacherReducer from "../reducers/teacherReducer";
const API = "http://localhost:5000/teachers";

const TeacherContext = createContext();
const initialState = {
  isSingleLoading: false,
  allTeachers: [],
  filteredTeachers: [],
  isLoading: false,
  isError: false,
  searchedText: "",
  searchedBy: "userName",
};

const TeacherProvider = ({ children }) => {
  // Corrected component name to start with an uppercase letter
  const [state, dispatch] = useReducer(teacherReducer, initialState);

  const fetchAllUsers = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const teachers = await res.data;
      dispatch({ type: "SET_API_DATA", payload: teachers });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // useEffect
  useEffect(() => {
    fetchAllUsers(API);
  }, []);

  //filtering teachers ************************
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_USERS", payload: state.allTeachers });
  }, [state.allTeachers]);

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
    <TeacherContext.Provider value={{ ...state, searchedText, searchBy }}>
      {children}
    </TeacherContext.Provider>
  );
};

const useTeacherContext = () => {
  return useContext(TeacherContext);
};

export { TeacherProvider, useTeacherContext };
