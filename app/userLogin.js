"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonServerConstants_1 = __importDefault(require("./constants/JsonServerConstants"));
const UserService_1 = __importDefault(require("./services/UserService"));
$(document).ready(function () {
    const userService = new UserService_1.default(JsonServerConstants_1.default.EndPoint);
    try {
        const form = document.forms.namedItem("form_login");
        form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
            return __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const username = $("#username").val();
                const password = $("#password").val();
                //Lỗi trống
                if (username === "" || password === "") {
                    alert("Không được để trống tên đăng nhập hoặc mật khẩu");
                    return;
                }
                //Post dữ liệu
                try {
                    const user = yield userService.findUserByUsernameAndPassword(username, password);
                    // console.log(user.data);
                    if (user) {
                        if (user.status === 300) {
                            alert(user.message);
                        }
                        else if (user.status === 200) {
                            alert(user.message);
                            sessionStorage.setItem("user", JSON.stringify(user.data));
                            window.location.href = "index.html";
                        }
                    }
                    else {
                        alert(user.message);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
