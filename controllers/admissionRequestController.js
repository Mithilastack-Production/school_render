const admissionRequestService = require("../services/admissionRequestService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");
exports.getAll = async (req, res) => {
    try {
        const admissionRequests = await admissionRequestService.getAll();
        res.json(admissionRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newAdmissionRequest = await admissionRequestService.create(
            req.body
        );
        res.json(newAdmissionRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedAdmissionRequest = await admissionRequestService.update(
            req.params.id,
            req.body
        );
        if (!updatedAdmissionRequest) {
            res.status(404).json({ error: "News item not found" });
        } else {
            res.json(updatedAdmissionRequest);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedAdmissionRequest = await admissionRequestService.delete(
            req.params.id
        );
        if (!deletedAdmissionRequest) {
            res.status(404).json({ error: "News item not found" });
        } else {
            res.json({ message: "News item deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
