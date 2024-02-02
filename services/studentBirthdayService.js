const StudentBirthday = require("../models/studentBirthdayModel");

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
    return await StudentBirthday.find({
        dob: {
            $gte: startOfToday,
            $lt: endOfToday,
        },
    }).sort({ createdAt: -1 });
};

exports.create = async (data) => {
    return await StudentBirthday.create(data);
};

exports.update = async (id, data) => {
    return await StudentBirthday.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
    return await StudentBirthday.findByIdAndDelete(id);
};
