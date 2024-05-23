import CategoryService from "./services/CategoryService";
import JsonServerConstants from "./constants/JsonServerConstants";
import ProductService from "./services/ProductService";

$(document).ready(() => {
    const productService = new ProductService(JsonServerConstants.EndPoint);
    const categoryService = new CategoryService(JsonServerConstants.EndPoint);

    try {
        const placeholder = $("#placeholder");

        productService.findAllProduct().then(async (data) => {
            let list = "";
            let stt = 0;

            const categories = await categoryService.findAllCategories();
            const categoryMap: { [key: string]: string } = {};

            for (const category of categories) {
                categoryMap[category._id] = category.name;
            }

            for (const key in data) {
                stt++;
                const product = data[key];
                const {
                    _id,
                    categoryId,
                    name,
                    price_old,
                    price_new,
                    product_image,
                    quantity,
                } = product;
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
        });
    } catch (error) {
        console.log(error);
    }
});
