"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("./services/CategoryService"));
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
$(document).ready(function () {
    const categoryService = new CategoryService_1.default(JsonServerConstants_1.default.EndPoint);
    try {
        const placeholder = $("#placeholder");
        // lấy danh sách categories qua api
        categoryService.findAllCategories().then((data) => {
            // console.log(data);
            let list = "";
            for (const key in data) {
                const category = data[key];
                // console.log(category);
                const { _id, name, image } = category;
                list += `
          <li>
            <a href="category_product.html?id=${_id}" title="">${name}</a>
          </li>
        `;
            }
            placeholder.append(list);
        });
    }
    catch (error) {
        console.log(error);
    }
});
