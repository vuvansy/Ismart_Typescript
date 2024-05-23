"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("./services/CategoryService"));
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
$(document).ready(() => {
    const categoryService = new CategoryService_1.default(JsonServerConstants_1.default.EndPoint);
    const id = window.location.toString().split("=")[1];
    const categoryIdCtrl = $("#categoryId");
    const nameCtrl = $("#categoryName");
    const imageCtrl = $("#categoryImage");
    categoryService.findCategoryById(id).then((data) => {
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
                .updateCategory(categoryIdCtrl.val(), category)
                .then(() => {
                location.href = "list-category.html";
            });
        }
        catch (error) {
            console.log(error);
        }
    });
});
