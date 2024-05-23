import JsonServerConstants from "./constants/JsonServerConstants";
import ProductService from "./services/ProductService";

$(document).ready(function () {
    const productService = new ProductService(
        JsonServerConstants.EndPoint);

    // phan tich URL de lay id
    const id = window.location.toString().split('=')[1];
    console.log(id);
        try {
            productService.deleteProduct(id).then(data => {
                location.href= "list-product.html";
            });
        } catch (error) {
            console.log(error);
        }
})