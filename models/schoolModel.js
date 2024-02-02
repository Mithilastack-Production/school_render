const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
    {
        name: String,
        address: String,
        logo: {
            src: String,
            alt: String,
        },
        certification: {
            src: String,
            alt: String,
        },
        phones: [String],
        emails: [String],
        timing: [String],
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const School = mongoose.model("School", schoolSchema);

module.exports = School;
