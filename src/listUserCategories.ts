import CategoryService from "./services/CategoryService";
import JsonServerConstants from "./constants/JsonServerConstants";

$(document).ready(function () {
    const categoryService = new CategoryService(JsonServerConstants.EndPoint);
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
    } catch (error) {
        console.log(error);
    }
});
