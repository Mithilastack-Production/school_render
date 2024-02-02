const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema(
    {
        src: String,
        text: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const Facility = mongoose.model("Facility", facilitySchema);

module.exports = Facility;
