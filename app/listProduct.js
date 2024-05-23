"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("./services/CategoryService"));
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const ProductService_1 = __importDefault(require("./services/ProductService"));
$(document).ready(() => {
    const productService = new ProductService_1.default(JsonServerConstants_1.default.EndPoint);
    const categoryService = new CategoryService_1.default(JsonServerConstants_1.default.EndPoint);
    try {
        const placeholder = $("#placeholder");
        productService.findAllProduct().then((data) => __awaiter(void 0, void 0, void 0, function* () {
            let list = "";
            let stt = 0;
            const categories = yield categoryService.findAllCategories();
            const categoryMap = {};
            for (const category of categories) {
                categoryMap[category._id] = category.name;
            }
            for (const key in data) {
                stt++;
                const product = data[key];
                const { _id, categoryId, name, price_old, price_new, product_image, quantity, } = product;
                const categoryName = categoryMap[categoryId] || "";
                list += `
                <tr class="">
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>${stt}</td>
                    <td>${_id}</td>
                    <td>
                        <img
                            src="${product_image}"
                            alt=""
                            class="thumb_category"
                        />
                    </td>
                    <td class="title-product">
                        <a href="#">${name}</a>
                    </td>
                    <td>${price_new}₫</td>
                    <td>${price_old}₫</td>
                    <td>
                        <span class="badge badge-success">${quantity}</span>
                    </td>
                    <td>
                        ${categoryName}
                    </td>
                    <td>
                        <a
                            href="edit-product.html?id=${_id}"
                            class="btn btn-success btn-sm rounded-0 text-white"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                        >
                            <i class="fa fa-edit"></i>
                        </a>
                        <a
                            href="deleteProduct.html?id=${_id}"
                            class="btn btn-danger btn-sm rounded-0 text-white"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                        >
                            <i class="fa fa-trash"></i>
                        </a>
                    </td>
                </tr>
            `;
            }
            placeholder.append(list);
        }));
    }
    catch (error) {
        console.log(error);
    }
});
