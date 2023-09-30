const express = require("express");
const router = express.Router();
const Classes = require("../models/ClassSchema");
const Students = require("../models/studentSchema");

router.post("/createClass", async (req, res) => {
  try {
    const { name, roomNumber, students, timeFrom, timeTo } = req.body;

    if (!name || !roomNumber || !students || timeFrom === "" || timeTo === "") {
      return res.status(400).json({ error: "Fill all fields" });
    }

    console.log("pass1");

    const classCreated = await Classes.create({
      name,
      roomNumber,
      students,
      timeFrom,
      timeTo,
    });

    console.log("pass2");

    const populatedClass = await Classes.populate(classCreated, {
      path: "students",
      select: "-password", // Exclude sensitive information from students
    });

    res.status(200).json(populatedClass);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAllClasses", async (req, res) => {
  try {
    const classes = await Classes.find({});
    res.send(classes);
  } catch (error) {
    console.log(error);
  }
});

router.get("/searchStudents", async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [{ userName: { $regex: `^${req.query.search}`, $options: "i" } }],
      }
    : {};

  const students = await Students.find({ ...keyword });
  res.send(students);
});

//fetch single class
router.get("/fetchSingleClass/:id", async (req, res) => {
  try {
    const classId = req.params.id;
    const getClass = await Classes.find({ _id: classId });
    res.json(getClass);
  } catch (error) {
    res.status(400).json({ error: "An error occurred" });
  }
});

// fetch data of the students who are the part of class
router.get("/fetchClassStudentsData/:chatIds", async (req, res) => {
  try {
    const chatIds = req.params.chatIds.split(","); // Split the chatIds into an array
    const messages = await Students.find({ _id: { $in: chatIds } });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: "An error occurred" });
  }
});

router.delete("/deleteClass/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const classToDelete = await Classes.findByIdAndDelete({ _id: id });

    if (!classToDelete) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

// update the data of class
router.put("/updateData", async (req, res) => {
  try {
    const {
      studentId,
      selectedClassId,
      addedUser,
      usersToDelete,
      className,
      roomNumber,
      //times
      timeFrom,
      timeTo,
    } = req.body;

    const classToUpdate = await Classes.findById(selectedClassId);
    if (!classToUpdate) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Update className and roomNumber if provided
    if (className !== "") {
      await Classes.updateOne({ _id: selectedClassId }, { name: className });
    }

    if (roomNumber !== "") {
      await Classes.updateOne(
        { _id: selectedClassId },
        { roomNumber: roomNumber }
      );
    }

    // for adding students ******************************
    if (addedUser !== null) {
      await Classes.updateOne(
        { _id: selectedClassId },
        { $push: { students: addedUser } },
        { new: true }
      );
      console.log("added");
    }

    // for removing
    if (usersToDelete !== null) {
      await Classes.updateOne(
        { _id: selectedClassId },
        { $pull: { students: { $in: usersToDelete } } }
      );
      console.log("remove");
    }

    //updating the time****************

    const updatedFields = {};

    // Update the fields only if they are provided in the request
    if (timeFrom !== "" && timeTo !== "") {
      updatedFields.timeFrom = timeFrom;
      updatedFields.timeTo = timeTo;
    }

    // Update the class document with the new values
    await Classes.updateOne({ _id: selectedClassId }, { $set: updatedFields });

    res
      .status(200)
      .json({ message: "Students removed from the class successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
