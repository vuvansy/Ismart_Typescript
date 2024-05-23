import CategoryService from "./services/CategoryService";
import JsonServerConstants from "./constants/JsonServerConstants";
import Category from "./models/Category";

$(document).ready(() => {
    $("#save").on("click", () => {
        const name = $("#categoryName").val() as string;
        const image = $("#categoryImage").val() as string;

        const category = { name, image };
        try {
            const categoryService = new CategoryService(
                JsonServerConstants.EndPoint
            );
            categoryService.insertCategory(category).then(() => {
                location.href = "list-category.html";
            });
        } catch (error) {
            console.log(error);
        }
        console.log("Save clicked");
    });
});
