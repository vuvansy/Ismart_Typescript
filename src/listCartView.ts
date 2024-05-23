import JsonServerConstants from "./constants/JsonServerConstants";
import CartService from "./services/CartService";

$(document).ready(function () {
    var infoUser = JSON.parse(sessionStorage.getItem("user") ?? "[]");
    if (infoUser && infoUser.id) {
        const id: string = infoUser.id;
        console.log(id);
        const cartService: CartService = new CartService(
            JsonServerConstants.EndPoint
        );

        const statusMap: { [key: number]: string } = {
            0: "Đang xử lý",
            1: "Đang vận chuyển",
            2: "Hoàn thành",
            3: "Đã hủy",
        };

        function convertDateFormat(dateString: string): string {
            const date: Date = new Date(dateString);

            let day: number | string = date.getDate();
            let month: number | string = date.getMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
            const year: number = date.getFullYear();

            // Đảm bảo rằng các giá trị có hai chữ số bằng cách thêm '0' nếu cần thiết
            if (day < 10) {
                day = "0" + day;
            }
            if (month < 10) {
                month = "0" + month;
            }

            const formattedDate: string = `${day}/${month}/${year}`;
            return formattedDate;
        }

        try {
            const placeholder = $("#showCartView");
            cartService.findCartByIdUser(id).then((data) => {
                console.log(data);
                let list = "";
                for (const key in data) {
                    const order = data[key];

                    const {
                        _id,
                        total,
                        quantity,
                        paymentMethod,
                        createdAt,
                        status,
                    } = order;

                    // Xử lý lại trạng thái đơn hàng và phương thức thanh toán
                    let paymentMethodText = "";
                    if (paymentMethod === "0") {
                        paymentMethodText = "Thanh toán bằng thẻ tín dụng";
                    } else if (paymentMethod === "1") {
                        paymentMethodText = "Thanh toán khi nhận hàng";
                    }

                    const statusText = statusMap[status]; // Ánh xạ giá trị trạng thái từ số sang chuỗi

                    let actionButton = "";
                    if (status === "0") {
                        actionButton = `<button class="cancel-order-button" data-order-id="${_id}">Hủy</button>`;
                    } else {
                        actionButton = `<button class="view-order-button" data-order-id="${_id}">Chi tiết</button>`;
                    }

                    list += `
            <tr>
              <td>${_id}</td>
              <td>${quantity}</td>
              <td>${total}đ</td>
              <td>${paymentMethodText}</td>
              <td>${convertDateFormat(createdAt)}</td>
              <td>${statusText}</td>
              <td>${actionButton}</td>
            </tr>
          `;
                }
                placeholder.append(list);

                // Xử lý sự kiện khi nút "Hủy đơn hàng" được nhấn
                $(".cancel-order-button").on("click", function () {
                    const orderId = $(this).data("order-id").toString();
                    console.log(orderId);
                    const confirmed = confirm(
                        "Bạn có chắc chắn muốn hủy đơn hàng này?"
                    );
                    if (confirmed) {
                        const newStatus = "3"; // Trạng thái mới
                        try {
                            cartService
                                .updateOrderStatus(orderId, newStatus)
                                .then((data) => {
                                    //console.log('Category is updated!');
                                    location.href = "cart-view.html";
                                });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        // Hiển thị thông báo yêu cầu đăng nhập
        const placeholder = $("#showCartView");
        placeholder.append(
            "<p>Bạn cần đăng nhập để xem danh sách đơn hàng.</p>"
        );
    }
});
