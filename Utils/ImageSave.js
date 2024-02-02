const path = require("path");
const Jimp = require("jimp");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

exports.imageSave = async (image) => {
    const buffer = Buffer.from(
        image.replace(/^data:image\/(png|jpg|jpeg|gif|tiff|bmp|svg|webp|heif|ico);base64,/, ""),
        "base64"
    );
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    const jimResp = await Jimp.read(buffer);
    jimResp.write(path.resolve(__dirname, `../storage/${imagePath}`));
    return imagePath;
};

exports.pdfSave = async (pdfBase64) => {
    const buffer = Buffer.from(
        pdfBase64.replace(/^data:application\/pdf;base64,/, ""),
        "base64"
    );
    const pdfPath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.pdf`;

    try {
        const pdfDoc = await PDFDocument.load(buffer);
        const pdfBytes = await pdfDoc.save();

        fs.writeFileSync(
            path.resolve(__dirname, `../storage/${pdfPath}`),
            pdfBytes
        );

        return pdfPath;
    } catch (error) {
        console.error("Error saving PDF", error);
        throw error;
    }
};

exports.deleteImage = async (src) => {
    try {
        const filePath = path.resolve(__dirname, `..${src}`);
        if (fs.existsSync(filePath)) {
            await fs.unlinkSync(filePath);
        }
    } catch (error) {
        console.log(error);
    }
};
