const mongoose = require('mongoose');

const studentBirthdaySchema = new mongoose.Schema({
  src: String,
  name: String,
  dob: Date,
  classOfStudent: String,
  section: String,
  message: String,

});

const StudentBirthday = mongoose.model('StudentBirthday', studentBirthdaySchema);

module.exports = StudentBirthday;
