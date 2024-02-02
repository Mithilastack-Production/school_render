const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        src: String,
        text: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
