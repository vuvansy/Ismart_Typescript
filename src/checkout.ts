import JsonServerConstants from "./constants/JsonServerConstants";
import CartService from "./services/CartService";
import OrderDetailService from "./services/OrderDetailService";

$(document).ready(function () {
    const CART = "CART";
    var infoUser = JSON.parse(sessionStorage.getItem("user") ?? "[]");
    // console.log(infoUser);
    const gh = JSON.parse(sessionStorage.getItem(CART) ?? "[]");

    function tinhTongTien(): number {
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
            alert(
                "Giỏ hàng của bạn hiện đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán."
            );
            return;
        }

        if (infoUser && infoUser.id) {
            // console.log(infoUser);
            const userId = infoUser.id;
            const fullnameInput = document.getElementById(
                "fullname"
            ) as HTMLInputElement;
            const emailInput = document.getElementById(
                "email"
            ) as HTMLInputElement;
            const addressInput = document.getElementById(
                "address"
            ) as HTMLInputElement;
            const phoneInput = document.getElementById(
                "phone"
            ) as HTMLInputElement;
            const noteInput = document.getElementById(
                "note"
            ) as HTMLInputElement;

            const paymentMethod = document.querySelector(
                'input[name="payment-method"]:checked'
            ) as HTMLInputElement;

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
                const cartService = new CartService(
                    JsonServerConstants.EndPoint
                );

                const orderDetailService = new OrderDetailService(
                    JsonServerConstants.EndPoint
                );

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
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Vui lòng đăng nhập trước khi đặt hàng!");
            location.href = "login.html";
        }
    });
});
