const mongoose = require("mongoose");

const teacherBirthdaySchema = new mongoose.Schema({
    src: String,
    name: String,
    dob: Date,
    message: String,
});

const TeacherBirthday = mongoose.model(
    "TeacherBirthday",
    teacherBirthdaySchema
);

module.exports = TeacherBirthday;
