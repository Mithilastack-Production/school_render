const TeacherBirthday = require("../models/teacherBirthdayModel");

exports.getAll = async () => {
    const today = new Date();
    const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
    );
    const endOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
        0,
        0,
        0,
        0
    );
    return await TeacherBirthday.find({
        dob: {
            $gte: startOfToday,
            $lt: endOfToday,
        },
    }).sort({ createdAt: -1 });
};

exports.create = async (data) => {
    return await TeacherBirthday.create(data);
};

exports.update = async (id, data) => {
    return await TeacherBirthday.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
    return await TeacherBirthday.findByIdAndDelete(id);
};
