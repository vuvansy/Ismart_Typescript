"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const ProductService_1 = __importDefault(require("./services/ProductService"));
$(document).ready(function () {
    const productService = new ProductService_1.default(JsonServerConstants_1.default.EndPoint);
    // phan tich URL de lay id
    const id = window.location.toString().split('=')[1];
    console.log(id);
    try {
        productService.deleteProduct(id).then(data => {
            location.href = "list-product.html";
        });
    }
    catch (error) {
        console.log(error);
    }
});
