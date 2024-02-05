const { login } = require("../controllers/loginController");
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
        $expr: {
            $and: [
                { $eq: [{ $dayOfMonth: "$dob" }, today.getDate()] },
                { $eq: [{ $month: "$dob" }, today.getMonth() + 1] }, // Months are zero-based in JavaScript Date
            ],
        },
    }).sort({ createdAt: -1 });
};

exports.getAllAdm = async () => {
    return await StudentBirthday.find({}).sort({ createdAt: -1 });
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
