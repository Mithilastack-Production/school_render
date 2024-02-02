const NoticeItem = require('../models/noticeItemModel');

exports.getAll = async () => {
  return await NoticeItem.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await NoticeItem.create(data);
};

exports.update = async (id, data) => {
  return await NoticeItem.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await NoticeItem.findByIdAndDelete(id);
};
