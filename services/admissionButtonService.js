const AdmissionButton = require('../models/admissionButtonModel');

exports.getAll = async () => {
  return await AdmissionButton.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await AdmissionButton.create(data);
};

exports.update = async (id, data) => {
  return await AdmissionButton.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await AdmissionButton.findByIdAndDelete(id);
};
