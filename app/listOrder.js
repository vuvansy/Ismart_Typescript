"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const CartService_1 = __importDefault(require("./services/CartService"));
$(document).ready(function () {
    const cartService = new CartService_1.default(JsonServerConstants_1.default.EndPoint);
    const listStatus = $("#listStatus");
    let listS = "";
    listS += `
            <a
            href="list-order.html?id=0"
            class="text-primary font-weight-bold"
            >Đang xử lý<span
                class="text-muted"
                id="muted0"
                >(10)</span
            ></a>
            <a
            href="list-order.html?id=1"
            class="text-primary font-weight-bold"
            >Đang vận chuyển<span
                class="text-muted"
                id="muted1"
                >(5)</span
            ></a>
            <a
            href="list-order.html?id=2"
            class="text-success font-weight-bold"
            >Hoàn thành<span
                class="text-muted"
                id="muted2"
                >(20)</span
            ></a>
            <a
            href="list-order.html?id=3"
            class="text-danger font-weight-bold"
            >Đã hủy<span
                class="text-muted"
                id="muted3"
                >(20)</span
            ></a>
    `;
    listStatus.append(listS);
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
    const statusMap = {
        0: "Đang xử lý",
        1: "Đang vận chuyển",
        2: "Hoàn thành",
        3: "Đã hủy",
    };
    try {
        const placeholder = $("#placeholder_order");
        // lấy danh sách categories qua api
        cartService.findAllCart().then((data) => {
            console.log(data);
            let list = "";
            var stt = 0;
            for (const key in data) {
                stt++;
                const order = data[key];
                // console.log(order);
                const { _id, fullname, phone, total, quantity, createdAt, status, } = order;
                const statusText = statusMap[status]; // Ánh xạ giá trị trạng thái từ số sang chuỗi
                // console.log(items);
                list += `
                    <tr>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td>${stt}</td>
                        <td>${_id}</td>
                        <td>
                            <strong>${fullname}</strong><br>
                            ${phone}
                        </td>
                        <td>${quantity}</td>
                        <td>${total}₫</td>
                        <td>
                            <span class="badge">${statusText}</span>
                        </td>
                        <td>${convertDateFormat(createdAt)}</td>
                        <td>
                            <a href="list-orderDetail.html?id=${_id}" class="text-danger font-weight-normal">Chi tiết</a>
                        </td>
                        <td>
                            <a href="updateOrder.html?id=${_id}" class="btn btn-success btn-sm rounded-0 text-white"
                                type="button" data-toggle="tooltip" data-placement="top" title="Edit">
                                <i class="fa fa-edit"></i>
                            </a>
                        </td>
                    </tr>
                `;
            }
            placeholder.append(list);
        });
    }
    catch (error) {
        console.log(error);
    }
    //Xử lý - Đếm số lượng đơn hàng theo trạng thái
    function countOrdersByStatus(status) {
        return new Promise((resolve, reject) => {
            cartService
                .findAllCart()
                .then((data) => {
                const count = data.reduce((acc, cart) => {
                    if (cart.status === status) {
                        return acc + 1;
                    }
                    return acc;
                }, 0);
                resolve(count);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    countOrdersByStatus("0")
        .then((count) => {
        document.getElementById("muted0").textContent = `(${count})`;
    })
        .catch((error) => {
        console.log(error);
    });
    countOrdersByStatus("1")
        .then((count) => {
        document.getElementById("muted1").textContent = `(${count})`;
    })
        .catch((error) => {
        console.log(error);
    });
    countOrdersByStatus("2")
        .then((count) => {
        document.getElementById("muted2").textContent = `(${count})`;
    })
        .catch((error) => {
        console.log(error);
    });
    countOrdersByStatus("3")
        .then((count) => {
        document.getElementById("muted3").textContent = `(${count})`;
    })
        .catch((error) => {
        console.log(error);
    });
});
