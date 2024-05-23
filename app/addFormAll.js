"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const ProductService_1 = __importDefault(require("./services/ProductService"));
$(document).ready(() => {
    $("#profile_pic_form_multiple").submit((event) => {
        event.preventDefault(); // Ngăn chặn form submit mặc định
        const multipleImagesInput = document.getElementById("multiple_images");
        console.log(multipleImagesInput);
        if (multipleImagesInput instanceof HTMLInputElement &&
            multipleImagesInput.files !== null) {
            const multipleImagesFiles = Array.from(multipleImagesInput.files); // Chuyển đổi FileList thành một mảng các tệp tin
            const formData = new FormData();
            multipleImagesFiles.forEach((file, index) => {
                formData.append("multiple_images", file);
            });
            console.log(formData);
            try {
                const productService = new ProductService_1.default(JsonServerConstants_1.default.EndPoint);
                // Gửi dữ liệu hình ảnh lên server
                productService
                    .insertFormAll(formData)
                    .then((data) => {
                    console.log(data);
                    if (data.status === 1) {
                        // Xử lý khi hình ảnh đã được tải lên thành công
                        const multipleImagesUrls = data.urls; // Mảng các URL ảnh đã được tải lên
                        productService
                            .insertFormAll({
                            multiple_images: multipleImagesUrls,
                        })
                            .then(() => {
                            alert("Thêm thành công!");
                            multipleImagesInput.value = "";
                            // location.href = "formAddFile.html";
                        });
                    }
                    else {
                        console.log("Upload image failed");
                    }
                })
                    .catch((error) => {
                    console.log("Upload image error: ", error);
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            console.log("No image file selected.");
        }
    });
});
