const mongoose = require("mongoose");

const admissionRequestSchema = new mongoose.Schema(
    {
        name: String,
        fatherName: String,
        motherName: String,
        address: String,
        phone: String,
        email: String,
        prevPercents: Number,
        dob: Date,
        message: String,
        gender: String,
        className: String,
        responded:Boolean,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const AdmissionRequestModel = mongoose.model(
    "AdmissionRequest",
    admissionRequestSchema
);

module.exports = AdmissionRequestModel;
