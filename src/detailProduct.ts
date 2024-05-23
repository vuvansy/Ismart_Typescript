import CategoryService from "./services/CategoryService";
import JsonServerConstants from "./constants/JsonServerConstants";
import Category from "./models/Category";
import ProductService from "./services/ProductService";

$(document).ready(() => {
    const productService = new ProductService(JsonServerConstants.EndPoint);

    const id = window.location.toString().split("=")[1];
    console.log(id);
    const productImage = document.querySelector(
        ".img_product"
    ) as HTMLImageElement;

    const productName = document.querySelector("#productName") as HTMLElement;

    const productPriceNew = document.querySelector(
        "#priceNewDetail"
    ) as HTMLElement;

    const productPriceOld = document.querySelector(
        "#priceOldDetail"
    ) as HTMLElement;

    const productDesc = document.querySelector(".descDetail") as HTMLElement;

    productService.findProductById(id).then((data) => {
        console.log(data);
        // console.log(data.name);
        if (
            productImage &&
            productName &&
            productPriceOld &&
            productPriceNew &&
            productDesc
        ) {
            productImage.src = data.product_image;
            productName.textContent = data.name;
            productDesc.textContent = data.description;
            productPriceNew.textContent = data.price_new.toString() + "đ";
            productPriceOld.textContent = data.price_old.toString() + "đ";
        }
    });
});
