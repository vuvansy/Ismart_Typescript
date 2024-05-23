import CategoryService from "./services/CategoryService";
import JsonServerConstants from "./constants/JsonServerConstants";
import Category from "./models/Category";

$(document).ready(function () {
    const categoryService = new CategoryService(
        JsonServerConstants.EndPoint);

    // phan tich URL de lay id
    const id = window.location.toString().split('=')[1];
    console.log(id);
        try {
            categoryService.deleteCategory(id).then(data => {
                //console.log('Category is updated!');
                location.href="list-category.html";
            });
        } catch (error) {
            console.log(error);
        }
})