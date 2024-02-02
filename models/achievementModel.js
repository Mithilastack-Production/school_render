const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
    {
        src: String,
        alt: String,
        title: String,
        subTitle: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
