"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("./services/CategoryService"));
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const ProductService_1 = __importDefault(require("./services/ProductService"));
$(document).ready(() => {
    const categoryService = new CategoryService_1.default(JsonServerConstants_1.default.EndPoint);
    const productService = new ProductService_1.default(JsonServerConstants_1.default.EndPoint);
    const categoryIdCtrl = $("#categoryId");
    categoryService.findAllCategories().then((data) => {
        let list = "";
        for (const key in data) {
            const element = data[key];
            const { _id, name } = element;
            list += `<option value='${_id}'>${name}</option>`;
        }
        categoryIdCtrl.append(list);
    });
    const id = window.location.toString().split("=")[1];
    const productIdCtrl = $("#productId");
    const nameCtrl = $("#productName");
    const imageCtrl = $("#product_image");
    const price_newCtrl = $("#price_new");
    const price_oldCtrl = $("#price_old");
    const quantityCtrl = $("#quantity");
    const descriptionCtrl = $("#description");
    productService.findProductById(id).then((data) => {
        const { _id, categoryId, name, price_old, price_new, product_image, quantity, description, } = data;
        productIdCtrl.val(_id);
        categoryIdCtrl.val(categoryId);
        nameCtrl.val(name);
        imageCtrl.val(product_image);
        price_newCtrl.val(price_new);
        price_oldCtrl.val(price_old);
        quantityCtrl.val(quantity);
        descriptionCtrl.val(description);
    });
    $("#update").on("click", (e) => {
        const product = {
            categoryId: categoryIdCtrl.val(),
            name: nameCtrl.val(),
            price_new: price_newCtrl.val(),
            price_old: price_oldCtrl.val(),
            quantity: quantityCtrl.val(),
            description: descriptionCtrl.val(),
            product_image: imageCtrl.val(),
        };
        try {
            productService
                .updateProduct(productIdCtrl.val(), product)
                .then(() => {
                location.href = "list-product.html";
            });
        }
        catch (error) {
            console.log(error);
        }
    });
});
