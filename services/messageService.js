const Message = require('../models/messageModel');

exports.getAll = async () => {
  return await Message.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await Message.create(data);
};

exports.update = async (id, data) => {
  return await Message.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await Message.findByIdAndDelete(id);
};
