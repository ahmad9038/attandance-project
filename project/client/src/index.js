import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
//chakra provider
import { ChakraProvider } from "@chakra-ui/react";
import { StudentProvider } from "../src/context/StudentContext";
import { TeacherProvider } from "./context/TeacherContext";
import { ClassProvider } from "./context/ClassContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme();
root.render(
  <ThemeProvider theme={theme}>
    <ClassProvider>
      <TeacherProvider>
        <StudentProvider>
          <ChakraProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ChakraProvider>
        </StudentProvider>
      </TeacherProvider>
    </ClassProvider>
  </ThemeProvider>
);
