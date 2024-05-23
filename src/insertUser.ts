import JsonServerConstants from "./constants/JsonServerConstants";
import UserService from "./services/UserService";

$(document).ready(function () {
    const formReg = document.getElementById("form_reg") as HTMLFormElement;
    console.log(formReg);
    formReg.addEventListener("submit", function (e) {
        // Lấy dữ liệu nhập vào form
        const username = $("#username").val() as string;
        const fullname = $("#fullname").val() as string;
        const email = $("#email").val() as string;
        const phone = $("#phone").val() as string;
        const address = $("#address").val() as string;
        const password = $("#password").val() as string;
        const confirm_pass = $("#confirm_pass").val() as string;

        // Kiểm tra không để trống các trường
        if (
            username === "" ||
            password === "" ||
            fullname === "" ||
            email === "" ||
            phone === "" ||
            address === "" ||
            confirm_pass === ""
        ) {
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
            const userService = new UserService(JsonServerConstants.EndPoint);
            userService.insertUser(user).then((data) => {
                if (data.status === 400) {
                    alert(data.message);
                } else if (data.status === 200) {
                    alert(data.message);
                    location.href = "login.html";
                }
            });
        } catch (error) {
            console.log(error);
        }

        e.preventDefault();
    });
});
