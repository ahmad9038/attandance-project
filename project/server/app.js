const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Move dotenv configuration to the top
dotenv.config({ path: "./config.env" });

require("./dbConnection");

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(require("./router/studentRouter"));
app.use(require("./router/userRoute"));
app.use("/class", require("./router/classRouter"));

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
