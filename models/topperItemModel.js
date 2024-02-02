const mongoose = require("mongoose");

const topperItemSchema = new mongoose.Schema(
    {
        src: String,
        name: String,
        percentage: Boolean,
        position: Number,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const TopperItem = mongoose.model("TopperItem", topperItemSchema);

module.exports = TopperItem;
