"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("./services/CategoryService"));
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const ProductService_1 = __importDefault(require("./services/ProductService"));
$(document).ready(() => {
    const categoryIdCtrl = $("#categoryId");
    const categoryService = new CategoryService_1.default(JsonServerConstants_1.default.EndPoint);
    categoryService.findAllCategories().then((data) => {
        console.log(data);
        let list = "";
        for (const key in data) {
            const element = data[key];
            const { _id, name } = element;
            list += `<option value='${_id}'>${name}</option>`;
        }
        categoryIdCtrl.append(list);
    });
    $("#save").on("click", () => {
        const name = $("#productName").val();
        const product_image = $("#product_image").val();
        const price_new = $("#price_new").val();
        const price_old = $("#price_old").val();
        const quantity = $("#quantity").val();
        const description = $("#description").val();
        const product = {
            categoryId: categoryIdCtrl.val(),
            name: name,
            product_image: product_image,
            price_new: price_new,
            price_old: price_old,
            quantity: quantity,
            description: description,
        };
        try {
            const productService = new ProductService_1.default(JsonServerConstants_1.default.EndPoint);
            productService.insertProduct(product).then((data) => {
                location.href = "list-product.html";
            });
        }
        catch (error) {
            console.log(error);
        }
    });
});
