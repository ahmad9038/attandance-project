import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import classReducer from "../reducers/classReducer";
const API = "http://localhost:5000/class/getAllClasses";

const ClassContext = createContext();
const initialState = {
  isSingleLoading: false,
  allClasses: [],
  searchedClasses: [],
  isLoading: false,
  isError: false,
  searchedText: "",
};

const ClassProvider = ({ children }) => {
  const [state, dispatch] = useReducer(classReducer, initialState);
  const [refreshData, setRefreshData] = useState(false);

  const fetchAllClasses = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const classes = await res.data;
      dispatch({ type: "SET_API_DATA", payload: classes });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // Function to trigger data refresh
  const refresh = () => {
    setRefreshData(!refreshData);
  };

  // useEffect
  useEffect(() => {
    fetchAllClasses(API);
  }, [refreshData]);

  //filtering students ************************
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_USERS", payload: state.allClasses });
  }, [state.allClasses]);

  console.log(state.searchedClasses);

  const searchedText = (event) => {
    const value = event.target.value;
    dispatch({ type: "SEARCHED_TEXT", payload: value });
  };

  // search the users
  useEffect(() => {
    dispatch({ type: "SEARCH_USERS" });
  }, [state.searchedText]);

  return (
    <ClassContext.Provider value={{ ...state, searchedText, refresh }}>
      {children}
    </ClassContext.Provider>
  );
};

const useClassContext = () => {
  return useContext(ClassContext);
};

export { ClassProvider, useClassContext };
