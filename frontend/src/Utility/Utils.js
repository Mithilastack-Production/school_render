import { toast } from "react-toastify";

export function toastWorking() {
    toast("We are working on this feature");
}

export function toastMessage(message) {
    toast(message);
}

export async function readFileAsDataURL(selectedFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = function () {
            resolve(reader.result);
        };
        reader.onerror = function () {
            reject(new Error("Could not process the image"));
        };
    });
}
