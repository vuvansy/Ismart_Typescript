"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("./services/CategoryService"));
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const ProductService_1 = __importDefault(require("./services/ProductService"));
$(document).ready(function () {
    const id = window.location.toString().split("=")[1];
    console.log(id);
    const productService = new ProductService_1.default(JsonServerConstants_1.default.EndPoint);
    const categoryService = new CategoryService_1.default(JsonServerConstants_1.default.EndPoint);
    try {
        const placeholder = $("#placeholder_product");
        const titleCategory = $("#title_category");
        // console.log(titleCategory);
        productService.findProductsByCategory(id).then((data) => {
            console.log(data);
            let list = "";
            const categorySet = new Set(); // Sử dụng Set để lưu trữ các danh mục đã xuất hiện
            // Lấy danh sách Category qua API
            categoryService.findAllCategories().then((categories) => {
                const categoryMap = {};
                categories.forEach((category) => {
                    categoryMap[category._id] = category.name;
                });
                for (const key in data) {
                    const product = data[key];
                    const { _id, categoryId, name, price_old, price_new, product_image, } = product;
                    const categoryName = categoryMap[categoryId] || ""; // Lấy tên loại hàng từ categoryMap
                    const title = `${categoryName}`;
                    // console.log(title);
                    if (!categorySet.has(categoryName)) {
                        // Kiểm tra xem danh mục đã tồn tại trong Set chưa
                        categorySet.add(categoryName); // Thêm danh mục vào Set
                        titleCategory.html(categoryName); // Hiển thị tên danh mục
                    }
                    list += `
            <li>
              <a href="detail_product.html?id=${_id}" title="" class="thumb">
                  <img src="${product_image}">
              </a>
              <a href="detail_product.html?id=${_id}" title="" class="product-name line-clamp line-2">${name}</a>
              <div class="price">
                  <span class="new">${price_new}</span><strong style="color:red">đ</strong>
                  <span class="old">${price_old}đ</span>
              </div>
              <div class="action clearfix">
                  <a onclick="addCart(this)" title="Thêm giỏ hàng" class="add-cart fl-left">Thêm giỏ hàng</a>
                  <a href="cart.html" onclick="addCart(this)" title="Mua ngay" class="buy-now fl-right addCart">Mua ngay</a>
              </div>
              <input type="hidden" value="${_id}">
            </li>
          `;
                }
                placeholder.append(list);
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
