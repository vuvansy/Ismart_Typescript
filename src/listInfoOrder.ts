import CategoryService from "./services/CategoryService";
import JsonServerConstants from "./constants/JsonServerConstants";
import CartService from "./services/CartService";
import OrderDetailService from "./services/OrderDetailService";

$(document).ready(function () {
    const cartService = new CartService(JsonServerConstants.EndPoint);
    const orderDetailService = new OrderDetailService(
        JsonServerConstants.EndPoint
    );
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

    // phan tich URL de lay id
    const idOrder = window.location.toString().split("=")[1];
    console.log(idOrder);

    try {
        const placeholder = $("#placeholder_orderInfo");
        const placeholder_info = $("#information");

        cartService.findCartByIdOrder(idOrder).then((data: any) => {
            console.log(data);
            // const idOrder = data._id;
            const orderId = data._id;
            console.log(orderId);
            orderDetailService
                .findOderDetailByIdOrder(orderId)
                .then((orderDetails: any) => {
                    console.log(orderDetails);
                    let list = "";

                    for (const orderDetail of orderDetails) {
                        const { productId, od_quantity, od_total, note } =
                            orderDetail;
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
                            Tên người đặt hàng: <strong>${
                                data.fullname
                            }</strong>
                            </div>
                            <div class="phone_order">
                            Số điện thoại người đặt hàng: <strong>${
                                data.phone
                            }</strong>
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
                            Thời gian đặt hàng: <strong>${convertDateFormat(
                                data.createdAt
                            )}</strong>
                            </div>
                         </div>
                </td>
                </tr>
               `;
                    //    placeholder.append(list);
                    placeholder.append(list);
                });
        });
    } catch (error) {
        console.log(error);
    }
});
