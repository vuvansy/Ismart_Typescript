import CategoryService from "./services/CategoryService";
import JsonServerConstants from "./constants/JsonServerConstants";
import ProductService from "./services/ProductService";

$(document).ready(() => {
    const categoryIdCtrl = $("#categoryId");
    const categoryService = new CategoryService(JsonServerConstants.EndPoint);

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
        const name = $("#productName").val() as string;
        const product_image = $("#product_image").val() as string;
        const price_new = $("#price_new").val() as string;
        const price_old = $("#price_old").val() as string;
        const quantity = $("#quantity").val() as string;
        const description = $("#description").val() as string;

        const product = {
            categoryId: categoryIdCtrl.val() as string,
            name: name,
            product_image: product_image,
            price_new: price_new,
            price_old: price_old,
            quantity: quantity,
            description: description,
        };

        try {
            const productService = new ProductService(
                JsonServerConstants.EndPoint
            );
            productService.insertProduct(product).then((data) => {
                location.href = "list-product.html";
            });
        } catch (error) {
            console.log(error);
        }
    });
});
