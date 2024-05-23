"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const CartService_1 = __importDefault(require("./services/CartService"));
const OrderDetailService_1 = __importDefault(require("./services/OrderDetailService"));
$(document).ready(function () {
    var _a, _b;
    const CART = "CART";
    var infoUser = JSON.parse((_a = sessionStorage.getItem("user")) !== null && _a !== void 0 ? _a : "[]");
    // console.log(infoUser);
    const gh = JSON.parse((_b = sessionStorage.getItem(CART)) !== null && _b !== void 0 ? _b : "[]");
    function tinhTongTien() {
        let tongTien = 0;
        for (let i = 0; i < gh.length; i++) {
            const sanPham = gh[i];
            const thanhTien = sanPham.gia * sanPham.soluong;
            tongTien += thanhTien;
        }
        return tongTien;
    }
    $("#order_now").on("click", () => {
        //Kiểm tra giỏ hàng trống
        if (!gh || gh.length === 0) {
            alert("Giỏ hàng của bạn hiện đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.");
            return;
        }
        if (infoUser && infoUser.id) {
            // console.log(infoUser);
            const userId = infoUser.id;
            const fullnameInput = document.getElementById("fullname");
            const emailInput = document.getElementById("email");
            const addressInput = document.getElementById("address");
            const phoneInput = document.getElementById("phone");
            const noteInput = document.getElementById("note");
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
            //Bắt lỗi phương thức thanh toán
            if (!paymentMethod) {
                alert("Vui lòng chọn phương thức thanh toán!");
                return;
            }
            const order = {
                userId: userId,
                fullname: fullnameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                address: addressInput.value,
                note: noteInput.value,
                status: "0",
                total: formatNumber(tinhTongTien()),
                quantity: gh.length,
                paymentMethod: paymentMethod.value,
            };
            // console.log(order);
            try {
                const cartService = new CartService_1.default(JsonServerConstants_1.default.EndPoint);
                const orderDetailService = new OrderDetailService_1.default(JsonServerConstants_1.default.EndPoint);
                cartService.insertCart(order).then((order) => {
                    const orderId = order.data._id;
                    console.log(orderId);
                    // Tạo các bản ghi trong bảng order-detail cho từng sản phẩm trong giỏ hàng
                    const orderDetails = [];
                    for (let i = 0; i < gh.length; i++) {
                        const sanPham = gh[i];
                        const thanhTien = sanPham.gia * sanPham.soluong;
                        const orderDetail = {
                            orderId: orderId,
                            productId: sanPham.idProduct,
                            od_quantity: sanPham.soluong,
                            od_price: formatNumber(sanPham.gia),
                            od_total: formatNumber(thanhTien),
                        };
                        orderDetails.push(orderDetail);
                    }
                    // console.log(orderDetails);
                    // Gửi yêu cầu tạo các bản ghi trong bảng order-detail
                    orderDetailService
                        .insertOrderDetail(orderDetails)
                        .then(() => {
                        alert("Đặt hàng thành công!");
                        sessionStorage.removeItem(CART);
                        location.href = "cart-view.html";
                    });
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            alert("Vui lòng đăng nhập trước khi đặt hàng!");
            location.href = "login.html";
        }
    });
});
