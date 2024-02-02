const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        label: String,
        messageData: String,
        src: String,
        alt: String,
        isOpposite: Boolean,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
