const mongoose = require("mongoose");

const topperSchema = new mongoose.Schema(
    {
        section: String,
        toppers: [
            {
                type: {
                    src: String,
                    name: String,
                    percentage: Number,
                    position: Number,
                    studentId: String,
                },
                default: [],
            },
        ],
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const Topper = mongoose.model("Topper", topperSchema);

module.exports = Topper;
