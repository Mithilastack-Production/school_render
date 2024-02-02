const Topper = require("../models/topperModel");

exports.getAll = async () => {
    return await Topper.find().sort({ position: 1 });
};

exports.getById = async (id) => {
    return await Topper.findOne({_id: id});
};

exports.create = async (data) => {
    return await Topper.create(data);
};

exports.update = async (section, data) => {
    return await Topper.findOneAndUpdate({ section }, data, { new: true });
};

exports.delete = async (section) => {
    return await Topper.findOneAndDelete({ section });
};
