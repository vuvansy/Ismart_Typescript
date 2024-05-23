"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const CartService_1 = __importDefault(require("./services/CartService"));
$(document).ready(function () {
    const cartService = new CartService_1.default(JsonServerConstants_1.default.EndPoint);
    const id = window.location.toString().split("=")[1];
    const orderIdIdCtrl = $("#orderId");
    const statusCtrl = $("#statusOrder");
    cartService.findCartByIdOrder(id).then((data) => {
        console.log(data);
        const { _id, status } = data;
        orderIdIdCtrl.val(_id);
        statusCtrl.val(status);
        // console.log( statusCtrl.val());
        // Ẩn tùy chọn hủy nếu đơn hàng đang vận chuyển
        if (statusCtrl.val() === "1" || statusCtrl.val() === "2") {
            $("#cancel_order").hide();
        }
        // Kiểm tra nếu đơn hàng đã hoàn thành
        if (statusCtrl.val() === "2") {
            // Ẩn các tùy chọn trạng thái khác
            $("#statusOrder option").each(function () {
                if ($(this).val() !== "2") {
                    $(this).hide();
                }
            });
        }
        // Kiểm tra nếu đơn hàng đã bị hủy
        if (statusCtrl.val() === "3") {
            // Ẩn các tùy chọn trạng thái khác
            $("#statusOrder option").each(function () {
                if ($(this).val() !== "3") {
                    $(this).hide();
                }
            });
        }
    });
    $("#update_order").on("click", (e) => {
        const confirmed = confirm("Bạn có chắc chắn muốn cập nhật cho đơn hàng");
        if (confirmed) {
            const newStatus = statusCtrl.val(); // Trạng thái mới
            // Kiểm tra giá trị không phải là 'undefined' trước khi sử dụng
            if (newStatus !== undefined) {
                console.log(newStatus);
                try {
                    cartService
                        .updateOrderStatus(id, newStatus.toString())
                        .then((data) => {
                        location.href = "list-order.html";
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        e.preventDefault();
    });
});
