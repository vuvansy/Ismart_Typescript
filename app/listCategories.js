"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("./services/CategoryService"));
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
$(document).ready(() => {
    const categoryService = new CategoryService_1.default(JsonServerConstants_1.default.EndPoint);
    try {
        const placeholder = $("#placeholder");
        // Lấy danh sách categories qua api
        categoryService.findAllCategories().then((data) => {
            console.log(data);
            let list = "";
            let stt = 0;
            for (const key in data) {
                stt++;
                const category = data[key];
                console.log(category);
                const { _id, name, image } = category;
                list += `
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                  ${stt}
                  </td>
                 <td>${_id}</td>
                 <td>
                    <img
                    src="${image}"
                    alt="" class="thumb_category"
                    />
                 </td>
                 <td>${name}</td>
                 <td>
                    <a
                        href="edit-category.html?id=${_id}"
                        class="btn btn-success btn-sm rounded-0 text-white"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Chỉnh sửa"
                        ><i class="fa fa-edit"></i
                    ></a>
                    <a
                        href="deleteCategory.html?id=${_id}"
                        class="btn btn-danger btn-sm rounded-0 text-white"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Xóa"
                        ><i class="fa fa-trash"></i
                    ></a>
                </td>
            </tr>
            `;
            }
            placeholder.append(list);
        });
    }
    catch (error) {
        console.log(error);
    }
});
