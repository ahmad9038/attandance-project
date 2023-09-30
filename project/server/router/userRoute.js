const express = require("express");
const router = express.Router();
const Admins = require("../models/AdminSchema");
const Students = require("../models/studentSchema");
const Teachers = require("../models/TeacherSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// for student registeration **********************************************************
router.post(
  "/register",
  [
    body("userName")
      .isLength({ min: 4 })
      .withMessage("User Name contains atleast 4 letters"),
  ],
  [body("email").isEmail().withMessage("Invalid email format")],

  async (req, res) => {
    try {
      const {
        userName,
        email,
        phone,
        rollNo,
        password,
        confirmPassword,
        department,
        gender,
        semester,
      } = req.body;

      if (
        !userName ||
        !email ||
        !phone ||
        !rollNo ||
        !password ||
        !confirmPassword ||
        !department ||
        !gender ||
        !semester
      ) {
        return res.status(400).json({ error: "Fill all fields" });
      }

      // Validate the request body against the defined validation rules
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg });
      }

      // Check if the email already exists
      const userExists = await Students.findOne({ email: email });
      if (userExists) {
        return res.status(422).json({ error: "Email already exists" });
      }

      // Check if the password and confirm password match
      if (password !== confirmPassword) {
        return res.status(422).json({ error: "Passwords do not match" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new Students({
        userName,
        email,
        phone,
        rollNo,
        password: hashedPassword,
        department,
        gender,
        semester,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// admin login ***************************************************************
router.post("/adminLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Enter All Info" });
    }

    const admin = await Admins.findOne({ email: email });

    if (!admin) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    // const isMatch = await bcrypt.compare(password, admin.password);
    const isMatch = admin.password;
    // if password or email not matching
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    res.status(200).json({
      message: "Verification successful",
      _id: admin._id,
    });
  } catch (error) {
    console.log(error);
  }
});

//student login
router.post("/studentLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Enter All Info" });
    }

    const student = await Students.findOne({ email: email });

    if (!student) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    // if password or email not matching
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    res.status(200).json({
      message: "Verification successful",
      _id: student._id,
    });
  } catch (error) {
    console.log(error);
  }
});

// teacher login
router.post("/teacherLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Enter All Info" });
    }

    const teacher = await Teachers.findOne({ email: email });
    console.log(teacher);

    if (!teacher) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    // if password or email not matching
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    res.status(200).json({
      message: "Verification successful",
      _id: teacher._id,
    });
  } catch (error) {
    console.log(error);
  }
});

//fetch admin data
router.get("/fetchAdminData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admins.findOne({ _id: id });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//fetch student data
router.get("/fetchStudentData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Students.findOne({ _id: id });

    if (!student) {
      return res.status(404).json({ error: "student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//fetch teacher data
router.get("/fetchTeacherData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await Teachers.findOne({ _id: id });

    if (!teacher) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(teacher);
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// edit/update student data
router.put(
  "/updateStudent/:id",

  // Define the validation rules for the request body
  [
    body("editedPhone")
      .isLength({ min: 11, max: 11 })
      .withMessage("Invalid phone number format"),
  ],

  async (req, res) => {
    try {
      const id = req.params.id;
      const { editedSemester, editedPhone } = req.body;

      const student = await Students.findOne({ _id: id });

      if (!student) {
        return res.status(404).json({ error: "student not found" });
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("asdfsdafsadf");
        return res.status(422).json({ error: "invalid phone" });
      }

      if (editedSemester > 8 || editedSemester < 1) {
        return res.status(422).json({ error: "invalid semester number" });
      }

      student.semester = editedSemester;
      student.phone = editedPhone;

      // Save the updated student document
      await student.save();

      res.json(student);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
