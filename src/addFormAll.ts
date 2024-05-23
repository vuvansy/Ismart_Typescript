import CategoryService from "./services/CategoryService";
import JsonServerConstants from "./constants/JsonServerConstants";
import ProductService from "./services/ProductService";

$(document).ready(() => {
    $("#profile_pic_form_multiple").submit((event) => {
        event.preventDefault(); // Ngăn chặn form submit mặc định

        const multipleImagesInput = document.getElementById("multiple_images");
        console.log(multipleImagesInput);
        if (
            multipleImagesInput instanceof HTMLInputElement &&
            multipleImagesInput.files !== null
        ) {
            const multipleImagesFiles = Array.from(multipleImagesInput.files); // Chuyển đổi FileList thành một mảng các tệp tin

            const formData = new FormData();
            multipleImagesFiles.forEach((file, index) => {
                formData.append("multiple_images", file);
            });

            console.log(formData);

            try {
                const productService = new ProductService(
                    JsonServerConstants.EndPoint
                );

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
                        } else {
                            console.log("Upload image failed");
                        }
                    })
                    .catch((error) => {
                        console.log("Upload image error: ", error);
                    });
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("No image file selected.");
        }
    });
});
