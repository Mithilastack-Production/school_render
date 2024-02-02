const facilityService = require("../services/facilityService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");

exports.getAll = async (req, res) => {
    try {
        const facilities = await facilityService.getAll();
        res.json(facilities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const {image} = req.body;
        const imagePath = await imageSave(image);
        req.body.src = `/storage/${imagePath}`;
        delete req.body.image;
        const newFacility = await facilityService.create(req.body);
        res.json(newFacility);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}; 

exports.update = async (req, res) => {
    try {
        let { image } = req.body;
        if (image) {
            const imagePath = await imageSave(image);
            req.body.src = `/storage/${imagePath}`;
            delete req.body.image;
        }
        const updatedFacility = await facilityService.update(
            req.params.id,
            req.body
        );
        if (!updatedFacility) {
            res.status(404).json({ error: "Facility not found" });
        } else {
            res.json(updatedFacility);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedFacility = await facilityService.delete(req.params.id);
        if (!deletedFacility) {
            res.status(404).json({ error: "Facility not found" });
        } else {
            await deleteImage(deletedFacility.src);
            res.json({ message: "Facility deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
