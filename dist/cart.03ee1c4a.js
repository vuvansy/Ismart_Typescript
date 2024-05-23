"use strict";
var _a;
const CART = "CART";
var giohang = [];
if (sessionStorage.getItem(CART)) giohang = JSON.parse((_a = sessionStorage.getItem(CART)) !== null && _a !== void 0 ? _a : "[]");
function addCart(x) {
    var _a;
    const pa = (_a = x.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode; // Lấy ra Node cha (kiểm tra null)
    if (pa) {
        const hinh = pa.children[0].children[0].src;
        console.log(hinh);
        const ten = pa.children[1].innerText;
        console.log(ten);
        const gia = processNumber(pa.children[2].children[0].innerText);
        const idProduct = pa.children[4].value;
        console.log(idProduct);
        console.log(gia);
        // var item = { idProduct, ten, hinh, gia };
        // giohang.push(item);
        //Lưu giỏ hàng lên sessionStorage
        // sessionStorage.setItem(CART, JSON.stringify(giohang));
        var soluong = 1;
        //=== Kiểm tra trùng sản phẩm trong giỏ hàng ===
        //if ten==sp trong giỏ hàng => Cần tìm ra vị trí sản phẩm trùng
        //=>function checkspgiohang(x) return vịtri
        // Cập nhật số lượng
        //=> function capnhatslsp(vitri) phải biết được vị trí sản phẩm cần cập nhật
        if (checkspgiohang(ten) >= 0) capnhatslsp(checkspgiohang(ten));
        else {
            var item = {
                hinh,
                ten,
                gia,
                idProduct,
                soluong
            };
            giohang.push(item);
        }
        //Hiển thị số lượng sp trong giỏ hàng
        soluongspCart();
        //Lưu giỏ hàng lên sessionStorage
        sessionStorage.setItem(CART, JSON.stringify(giohang));
    }
}
// Hàm cập nhật số lượng sản phẩm nếu đã tồn tại sản phẩm đó trong giỏ hàng
// Tìm tới vị trí sp trùng và cập nhật số lượng (tăng lên 1)
function capnhatslsp(vt) {
    for(let i = 0; i < giohang.length; i++)if (i === vt) {
        giohang[i].soluong += 1;
        break;
    }
}
// Hàm kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
// Nếu hàm tìm ra sp trùng trong giỏ hàng trả về vị trí
// Ngược lại trả về 1 số âm
// x có thể là tên hoặc id
function checkspgiohang(x) {
    let vitri = -1;
    for(let i = 0; i < giohang.length; i++)if (giohang[i].ten === x) {
        vitri = i;
        break;
    }
    return vitri;
}
//Nút tăng (+) số lượng sản phẩm trong Cart
function tangsl(x) {
    const ongnoi = x.parentNode;
    const vt = parseInt(ongnoi.children[0].value);
    const sl = ongnoi.children[2];
    let slmoi = 0;
    let thanhtien = 0;
    for(let i = 0; i < giohang.length; i++)if (i === vt) {
        slmoi = giohang[i].soluong + 1;
        thanhtien = slmoi * giohang[i].gia;
        //Cập nhật vào mảng
        giohang[i].soluong += 1;
        break;
    }
    sessionStorage.setItem(CART, JSON.stringify(giohang));
    //Show ra html
    sl.value = slmoi.toString();
    //gán giá trị cho total
    //1.Xác định vị trí total
    const nextSibling = ongnoi.nextElementSibling;
    if (nextSibling) {
        const tt = nextSibling.children[0];
        tt.innerText = formatNumber(thanhtien);
    }
    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) totalPriceElement.children[0].innerText = `${formatNumber(tinhTongTien())}\u{111}`;
}
//Nút giảm (-) số lượng sản phẩm trong Cart
function giamsl(x) {
    const ongnoi = x.parentNode;
    const vt = parseInt(ongnoi.children[0].value);
    const sl = ongnoi.children[2];
    if (parseInt(sl.value) > 1) {
        let slmoi = 0;
        let thanhtien = 0;
        for(let i = 0; i < giohang.length; i++)if (i === vt) {
            slmoi = giohang[i].soluong - 1;
            thanhtien = slmoi * giohang[i].gia;
            //Cập nhật vào mảng
            giohang[i].soluong -= 1;
            break;
        }
        sessionStorage.setItem(CART, JSON.stringify(giohang));
        //Show ra html
        sl.value = slmoi.toString();
        //gán giá trị cho total
        //1.Xác định vị trí total
        const nextSibling = ongnoi.nextElementSibling;
        if (nextSibling) {
            const tt = nextSibling.children[0];
            tt.innerText = formatNumber(thanhtien);
        }
    } else alert("Kh\xf4ng th\u1EC3 gi\u1EA3m h\u01A1n \u0111\u01B0\u1EE3c n\u1EEFa");
    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) totalPriceElement.children[0].innerText = `${formatNumber(tinhTongTien())}\u{111}`;
}
// Hàm xóa sản phẩm ra khỏi giỏ hàng
function xoaSanPham(index) {
    // Xóa sản phẩm khỏi mảng giỏ hàng dựa trên chỉ mục
    giohang.splice(index, 1);
    // Lưu giỏ hàng mới lên sessionStorage
    sessionStorage.setItem(CART, JSON.stringify(giohang));
    // Hiển thị lại giỏ hàng sau khi xóa
    showCart();
    // Kiểm tra độ dài của giỏ hàng sau khi xóa
    const totalPriceElement = document.getElementById("total-price");
    if (giohang.length === 0) {
        if (totalPriceElement) totalPriceElement.children[0].innerText = "0\u0111";
    } else if (totalPriceElement) totalPriceElement.children[0].innerText = `${formatNumber(tinhTongTien())}\u{111}`;
}
//Tổng tiền hóa đơn
function tinhTongTien() {
    var tongTien = 0;
    for(var i = 0; i < giohang.length; i++){
        var sanPham = giohang[i];
        var thanhTien = sanPham.gia * sanPham.soluong;
        tongTien += thanhTien;
    }
    return tongTien;
}
// Hàm show dữ liệu lên giao diện
function showCart() {
    var _a;
    let kq = "";
    // Lấy dữ liệu trên sessionStorage về
    const gh = JSON.parse((_a = sessionStorage.getItem(CART)) !== null && _a !== void 0 ? _a : "null");
    // console.log(gh);
    if (gh && gh.length > 0) {
        for(let i = 0; i < gh.length; i++)// Kiểm tra gh[i] không phải là null
        if (gh[i] !== null) {
            const total = parseFloat(gh[i].gia) * parseInt(gh[i].soluong);
            kq += `
                    <tr>
                        <td>${gh[i].idProduct}</td>
                        <td>
                            <a href=".html" title="" class="thumb">
                                <img src="${gh[i].hinh}" alt="">
                            </a>
                        </td>
                        <td style="width:400px">
                            <a href=".html" title="" class="name-product line-clamp">${gh[i].ten}</a>
                        </td>
                        <td>${formatNumber(gh[i].gia)}\u{111}</td>
                        <td>
                            <input type="hidden" value="${i}">
                            <button onclick="giamsl(this)" class="btn btn-sm btn-minus">
                                <i class="fa fa-minus"></i>
                            </button>
                            <input type="text" name="num-order" value="${gh[i].soluong}" class="num-order">
                            <button onclick="tangsl(this)" class="btn btn-plus">
                                <i class="fa fa-plus"></i>
                            </button>
                        </td>
                        <td><span>${formatNumber(total)}</span>\u{111}</td>
                        <td>
                            <a onclick="xoaSanPham(${i})" title="" class="del-product"><i class="fa fa-trash-o"></i></a>
                        </td>
                    </tr>
                `;
        }
        document.getElementById("showCart").innerHTML = kq;
        soluongspCart();
        document.getElementById("total-price").children[0].innerText = `${formatNumber(tinhTongTien())}\u{111}`;
    } else // Nếu không có dữ liệu trong giỏ hàng
    document.getElementById("showCart").innerHTML = "B\u1EA1n ch\u01B0a c\xf3 s\u1EA3n ph\u1EA9m n\xe0o trong gi\u1ECF h\xe0ng!";
}
function soluongspCart() {
    //Hiển thị số lượng sp trong giỏ hàng
    document.getElementById("num").innerText = giohang.length.toString();
}
function loadData() {
    soluongspCart();
    showttOrder();
    showInfoUser();
}
//====== CÁC HÀM SỬ LÝ GIÁ ========
// Hàm sử lý số liệu
function processNumber(inputString) {
    // Loại bỏ dấu chấm trong chuỗi
    const processedString = inputString.replace(/\./g, "");
    const outputNumber = parseInt(processedString);
    return outputNumber;
}
function formatNumber(inputNumber) {
    // Chuyển đổi số thành chuỗi
    const inputString = inputNumber.toString();
    // Kiểm tra độ dài của chuỗi
    const length = inputString.length;
    // Xác định số dấu chấm cần thêm vào
    const dotCount = Math.floor((length - 1) / 3);
    // Tạo một mảng các phần tử từ chuỗi
    const parts = inputString.split("");
    // Thêm dấu chấm vào chuỗi
    for(let i = 1; i <= dotCount; i++)parts.splice(length - i * 3, 0, ".");
    // Kết hợp các phần tử thành chuỗi mới
    const outputString = parts.join("");
    // Trả về chuỗi đã được định dạng
    return outputString;
}
//================= CHECKOUT =============
function showttOrder() {
    var _a;
    let kq = "";
    // Lấy dữ liệu trên sessionStorage về
    const gh = JSON.parse((_a = sessionStorage.getItem(CART)) !== null && _a !== void 0 ? _a : "[]");
    // console.log(gh);
    for(let i = 0; i < gh.length; i++){
        const total = parseFloat(gh[i].gia) * parseInt(gh[i].soluong);
        kq += `
        <tr class="cart-item">
            <td class="product-name">${gh[i].ten}<strong class="product-quantity">x ${gh[i].soluong}</strong></td>
            <td class="product-total">${formatNumber(total)}\u{111}</td>
        </tr>
        `;
    }
    const showttOrderElement = document.getElementById("showttOrder");
    if (showttOrderElement) showttOrderElement.innerHTML = kq;
    soluongspCart();
    const totalOrderElement = document.getElementById("total_order");
    if (totalOrderElement) totalOrderElement.innerText = `${formatNumber(tinhTongTien())}\u{111}`;
}
function showInfoUser() {
    var _a;
    const infoUser = JSON.parse((_a = sessionStorage.getItem("user")) !== null && _a !== void 0 ? _a : "[]");
    // console.log(infoUser);
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const addressInput = document.getElementById("address");
    const phoneInput = document.getElementById("phone");
    const noteInput = document.getElementById("note");
    if (infoUser) {
        fullnameInput.value = infoUser.fullname || "";
        emailInput.value = infoUser.email || "";
        addressInput.value = infoUser.address || "";
        phoneInput.value = infoUser.phone || "";
    }
//Để tránh gán giá trị là undefined cho các trường input khi dữ liệu không tồn tại,
//có thể sử dụng toán tử logic ngắn circuit (&&) để kiểm tra và gán giá trị chỉ khi dữ liệu tồn tại.
//==>sử dụng toán tử || để kiểm tra và gán giá trị trống ("")
// cho các trường input khi thuộc tính tương ứng trong infoUser không tồn tại hoặc có giá trị undefined.
}

//# sourceMappingURL=cart.03ee1c4a.js.map
