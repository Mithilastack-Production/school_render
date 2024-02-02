const AdmissionRequestModel = require('../models/admissionRequestModel');

exports.getAll = async () => {
  return await AdmissionRequestModel.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await AdmissionRequestModel.create(data);
};

exports.update = async (id, data) => {
  return await AdmissionRequestModel.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await AdmissionRequestModel.findByIdAndDelete(id);
};
