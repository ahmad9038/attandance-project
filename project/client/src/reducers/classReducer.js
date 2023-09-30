const classReducer = (state, action) => {
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
        allClasses: action.payload,
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
        searchedClasses: [...action.payload],
      };

    case "SEARCHED_TEXT":
      return {
        ...state,
        searchedText: action.payload,
      };

    case "SEARCH_USERS":
      const { allClasses, searchedText } = state;

      const searchedClasses = allClasses.filter((curClass) => {
        return curClass.name.toLowerCase().startsWith(searchedText);
      });

      return {
        ...state,
        searchedClasses: searchedClasses,
      };

      return {
        ...state,
        SearchedClasses: searchedClasses,
      };
  }
};

export default classReducer;
