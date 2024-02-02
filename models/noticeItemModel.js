const mongoose = require("mongoose");

const noticeItemSchema = new mongoose.Schema(
    {
        message: String,
        src: String,
        publishedDate:Date
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const NoticeItem = mongoose.model("NoticeItem", noticeItemSchema);

module.exports = NoticeItem;
