"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("./services/CategoryService"));
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
$(document).ready(() => {
    $("#save").on("click", () => {
        const name = $("#categoryName").val();
        const image = $("#categoryImage").val();
        const category = { name, image };
        try {
            const categoryService = new CategoryService_1.default(JsonServerConstants_1.default.EndPoint);
            categoryService.insertCategory(category).then(() => {
                location.href = "list-category.html";
            });
        }
        catch (error) {
            console.log(error);
        }
        console.log("Save clicked");
    });
});
