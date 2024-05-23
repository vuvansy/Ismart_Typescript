import CategoryService from "./services/CategoryService";
import JsonServerConstants from "./constants/JsonServerConstants";
import ProductService from "./services/ProductService";

$(document).ready(() => {
    $("#profile_pic_form").submit((event) => {
        event.preventDefault(); // Ngăn chặn form submit mặc định

        const imageInput = document.getElementById("profile_pic");
        if (
            imageInput instanceof HTMLInputElement &&
            imageInput.files !== null
        ) {
            const selectedFile = imageInput.files[0];
            const formData = new FormData();
            formData.append("profile_pic", selectedFile);

            try {
                const productService = new ProductService(
                    JsonServerConstants.EndPoint
                );

                // Gửi dữ liệu hình ảnh lên server
                productService
                    .insertForm(formData)
                    .then((data) => {
                        if (data.status === 1) {
                            //sau khi hình ảnh được tải lên thành công, url của hình ảnh được trả về và sử dụng để gửi
                            //một yêu cầu khác đến máy chủ ProductService để lưu trữ url trong cơ sở dữ liệu.
                            const imageUrl = data.url;
                            productService
                                .insertForm({ profile_pic: imageUrl })
                                .then(() => {
                                    alert("Thêm thành công!");
                                    imageInput.value = "";
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
