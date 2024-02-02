const mongoose = require("mongoose");

const admissionBtnSchema = new mongoose.Schema(
    {
        src: String,
        alt: String,
        message: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const AdmissionBtn = mongoose.model("AdmissionBtn", admissionBtnSchema);

module.exports = AdmissionBtn;
