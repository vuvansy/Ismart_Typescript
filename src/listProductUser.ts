import CategoryService from "./services/CategoryService";
import JsonServerConstants from "./constants/JsonServerConstants";
import ProductService from "./services/ProductService";

$(document).ready(function () {
    const id = window.location.toString().split("=")[1];
    console.log(id);

    const productService = new ProductService(JsonServerConstants.EndPoint);
    const categoryService = new CategoryService(JsonServerConstants.EndPoint);
    try {
        const placeholder = $("#placeholder_product");
        const titleCategory = $("#title_category");
        // console.log(titleCategory);
        productService.findProductsByCategory(id).then((data) => {
            console.log(data);
            let list = "";
            const categorySet = new Set<string>(); // Sử dụng Set để lưu trữ các danh mục đã xuất hiện

            // Lấy danh sách Category qua API
            categoryService.findAllCategories().then((categories) => {
                const categoryMap: { [key: string]: string } = {};
                categories.forEach((category: any) => {
                    categoryMap[category._id] = category.name;
                });

                for (const key in data) {
                    const product = data[key];

                    const {
                        _id,
                        categoryId,
                        name,
                        price_old,
                        price_new,
                        product_image,
                    } = product;
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
    } catch (error) {
        console.log(error);
    }
});
