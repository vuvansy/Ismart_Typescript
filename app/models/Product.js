"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(categoryId, id, name, price_old, price_new, product_image, quantity, description) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.price_old = price_old;
        this.price_new = price_new;
        this.product_image = product_image;
        this.quantity = quantity;
        this.description = description;
    }
}
exports.default = Product;
