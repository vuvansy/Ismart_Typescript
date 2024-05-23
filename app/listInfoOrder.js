"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const CartService_1 = __importDefault(require("./services/CartService"));
const OrderDetailService_1 = __importDefault(require("./services/OrderDetailService"));
$(document).ready(function () {
    const cartService = new CartService_1.default(JsonServerConstants_1.default.EndPoint);
    const orderDetailService = new OrderDetailService_1.default(JsonServerConstants_1.default.EndPoint);
    function convertDateFormat(dateString) {
        const date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
        const year = date.getFullYear();
        // Đảm bảo rằng các giá trị có hai chữ số bằng cách thêm '0' nếu cần thiết
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }
    // phan tich URL de lay id
    const idOrder = window.location.toString().split("=")[1];
    console.log(idOrder);
    try {
        const placeholder = $("#placeholder_orderInfo");
        const placeholder_info = $("#information");
        cartService.findCartByIdOrder(idOrder).then((data) => {
            console.log(data);
            // const idOrder = data._id;
            const orderId = data._id;
            console.log(orderId);
            orderDetailService
                .findOderDetailByIdOrder(orderId)
                .then((orderDetails) => {
                console.log(orderDetails);
                let list = "";
                for (const orderDetail of orderDetails) {
                    const { productId, od_quantity, od_total, note } = orderDetail;
                    // console.log(productId, od_quantity, od_total);
                    const { name, product_image, price_new } = productId;
                    list += `
                            <tr>
                                <td>
                                    <img
                                    src="${product_image}"
                                    alt="" class="thumb_category"
                                    />
                                </td>
                                <td>${name}</td>
                                <td>${price_new}đ</td>
                                <td><span
                                class="badge badge-success"
                                >${od_quantity}</span
                            ></td>
                                <td>${od_total}đ</td>
                            </tr>
                        `;
                }
                list += `
                    <tr>
                        <td colspan="5"
                            class="title_infoOrder"
                            style="font-weight: 600"
                        >
                            Thông tin đơn hàng vận chuyển
                        </td>
                    </tr>
                    `;
                list += `
               <tr id="information">
               <td colspan="5">
                        <div class="left">
                            <div class="id_order">
                            Mã đơn hàng: <strong>${data._id}</strong>
                            </div>
                            <div class="user_order">
                            Tên người đặt hàng: <strong>${data.fullname}</strong>
                            </div>
                            <div class="phone_order">
                            Số điện thoại người đặt hàng: <strong>${data.phone}</strong>
                            </div>
                        </div>
                        <div class="right">
                            <div class="email_order">
                            Email: <strong>${data.email}</strong>
                            </div>
                            <div class="address_order">
                            Địa chỉ đặt hàng: <strong>${data.address}</strong>
                            </div>
                            <div class="content">
                            Ghi chú: <strong>${data.note}</strong>
                            </div>
                            <div class="data_order">
                            Thời gian đặt hàng: <strong>${convertDateFormat(data.createdAt)}</strong>
                            </div>
                         </div>
                </td>
                </tr>
               `;
                //    placeholder.append(list);
                placeholder.append(list);
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
