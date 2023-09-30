const studentReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_API_DATA":
      return {
        ...state,
        isLoading: false,
        allStudents: action.payload,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "LOAD_FILTER_USERS":
      return {
        ...state,
        filteredStudents: [...action.payload],
      };

    case "SEARCHED_TEXT":
      return {
        ...state,
        searchedText: action.payload,
      };

    case "SEARCH_USERS":
      const { allStudents, searchedText, searchedBy } = state;

      const filteredStudents = allStudents.filter((student) => {
        return student[searchedBy].toLowerCase().startsWith(searchedText);
      });

      return {
        ...state,
        filteredStudents: filteredStudents,
      };

    // get the search by value
    case "SET_SEARCHBY_VALUE":
      let searchByValue = document.getElementById("searchBy");
      let value = searchByValue.options[searchByValue.selectedIndex].value;
      return {
        ...state,
        searchedBy: value,
      };
  }
};

export default studentReducer;
