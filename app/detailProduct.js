"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const ProductService_1 = __importDefault(require("./services/ProductService"));
$(document).ready(() => {
    const productService = new ProductService_1.default(JsonServerConstants_1.default.EndPoint);
    const id = window.location.toString().split("=")[1];
    console.log(id);
    const productImage = document.querySelector(".img_product");
    const productName = document.querySelector("#productName");
    const productPriceNew = document.querySelector("#priceNewDetail");
    const productPriceOld = document.querySelector("#priceOldDetail");
    const productDesc = document.querySelector(".descDetail");
    productService.findProductById(id).then((data) => {
        console.log(data);
        // console.log(data.name);
        if (productImage &&
            productName &&
            productPriceOld &&
            productPriceNew &&
            productDesc) {
            productImage.src = data.product_image;
            productName.textContent = data.name;
            productDesc.textContent = data.description;
            productPriceNew.textContent = data.price_new.toString() + "đ";
            productPriceOld.textContent = data.price_old.toString() + "đ";
        }
    });
});
