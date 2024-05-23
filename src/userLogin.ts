import JsonServerConstants from "./constants/JsonServerConstants";
import UserService from "./services/UserService";

$(document).ready(function () {
    const userService = new UserService(JsonServerConstants.EndPoint);
    try {
        const form = document.forms.namedItem("form_login");
        form?.addEventListener("submit", async function (e) {
            e.preventDefault();
            const username = $("#username").val() as string;
            const password = $("#password").val() as string;
            //Lỗi trống
            if (username === "" || password === "") {
                alert("Không được để trống tên đăng nhập hoặc mật khẩu");
                return;
            }
            //Post dữ liệu
            try {
                const user = await userService.findUserByUsernameAndPassword(
                    username,
                    password
                );
                // console.log(user.data);
                if (user) {
                    if (user.status === 300) {
                        alert(user.message);
                    } else if (user.status === 200) {
                        alert(user.message);
                        sessionStorage.setItem(
                            "user",
                            JSON.stringify(user.data)
                        );
                        window.location.href = "index.html";
                    }
                } else {
                    alert(user.message);
                }
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
});
