"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const UserService_1 = __importDefault(require("./services/UserService"));
$(document).ready(function () {
    const formReg = document.getElementById("form_reg");
    console.log(formReg);
    formReg.addEventListener("submit", function (e) {
        // Lấy dữ liệu nhập vào form
        const username = $("#username").val();
        const fullname = $("#fullname").val();
        const email = $("#email").val();
        const phone = $("#phone").val();
        const address = $("#address").val();
        const password = $("#password").val();
        const confirm_pass = $("#confirm_pass").val();
        // Kiểm tra không để trống các trường
        if (username === "" ||
            password === "" ||
            fullname === "" ||
            email === "" ||
            phone === "" ||
            address === "" ||
            confirm_pass === "") {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }
        // Kiểm tra mật khẩu và xác nhận mật khẩu khớp nhau
        if (password !== confirm_pass) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp");
            return;
        }
        // Lưu dữ liệu vào Object User
        const user = {
            username: username,
            password: password,
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
        };
        // Thực hiện khởi tạo đối tượng User và insert dữ liệu vào
        try {
            const userService = new UserService_1.default(JsonServerConstants_1.default.EndPoint);
            userService.insertUser(user).then((data) => {
                if (data.status === 400) {
                    alert(data.message);
                }
                else if (data.status === 200) {
                    alert(data.message);
                    location.href = "login.html";
                }
            });
        }
        catch (error) {
            console.log(error);
        }
        e.preventDefault();
    });
});
