"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("./services/CategoryService"));
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
$(document).ready(function () {
    const categoryService = new CategoryService_1.default(JsonServerConstants_1.default.EndPoint);
    // phan tich URL de lay id
    const id = window.location.toString().split('=')[1];
    console.log(id);
    try {
        categoryService.deleteCategory(id).then(data => {
            //console.log('Category is updated!');
            location.href = "list-category.html";
        });
    }
    catch (error) {
        console.log(error);
    }
});
