import CategoryService from "./services/CategoryService";
import JsonServerConstants from "./constants/JsonServerConstants";
import Category from "./models/Category";

$(document).ready(() => {
    const categoryService = new CategoryService(JsonServerConstants.EndPoint);

    const id = window.location.toString().split("=")[1];

    const categoryIdCtrl = $("#categoryId");
    const nameCtrl = $("#categoryName");
    const imageCtrl = $("#categoryImage");

    categoryService.findCategoryById(id).then((data: Category) => {
        const { name, image } = data;
        console.log(data);
        categoryIdCtrl.val(id);
        nameCtrl.val(name);
        imageCtrl.val(image);
    });

    $("#update").on("click", () => {
        const category = {
            name: nameCtrl.val(),
            image: imageCtrl.val(),
        };

        try {
            categoryService
                .updateCategory(categoryIdCtrl.val() as string, category)
                .then(() => {
                    location.href = "list-category.html";
                });
        } catch (error) {
            console.log(error);
        }
    });
});
