const CART: string = "CART";
var giohang: any[] = [];

if (sessionStorage.getItem(CART)) {
    giohang = JSON.parse(sessionStorage.getItem(CART) ?? "[]");
}

function addCart(x: HTMLElement) {
    const pa: HTMLElement | null = x.parentNode
        ?.parentNode as HTMLElement | null; // Lấy ra Node cha (kiểm tra null)
    if (pa) {
        const hinh: string = (pa.children[0].children[0] as HTMLImageElement)
            .src;
        console.log(hinh);
        const ten: string = (pa.children[1] as HTMLElement).innerText;
        console.log(ten);
        const gia: number = processNumber(
            (pa.children[2].children[0] as HTMLElement).innerText
        );
        const idProduct: string = (pa.children[4] as HTMLInputElement).value;
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

        if (checkspgiohang(ten) >= 0) {
            capnhatslsp(checkspgiohang(ten));
        } else {
            var item = { hinh, ten, gia, idProduct, soluong };
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
function capnhatslsp(vt: number): void {
    for (let i = 0; i < giohang.length; i++) {
        if (i === vt) {
            giohang[i].soluong += 1;
            break;
        }
    }
}

// Hàm kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
// Nếu hàm tìm ra sp trùng trong giỏ hàng trả về vị trí
// Ngược lại trả về 1 số âm
// x có thể là tên hoặc id
function checkspgiohang(x: string): number {
    let vitri = -1;
    for (let i = 0; i < giohang.length; i++) {
        if (giohang[i].ten === x) {
            vitri = i;
            break;
        }
    }
    return vitri;
}

//Nút tăng (+) số lượng sản phẩm trong Cart
function tangsl(x: HTMLButtonElement): void {
    const ongnoi = x.parentNode as HTMLElement;
    console.log(ongnoi);
    const vt = parseInt((ongnoi.children[0] as HTMLInputElement).value);
    const sl = ongnoi.children[2] as HTMLInputElement;

    let slmoi = 0;
    let thanhtien = 0;
    for (let i = 0; i < giohang.length; i++) {
        if (i === vt) {
            slmoi = giohang[i].soluong + 1;
            thanhtien = slmoi * giohang[i].gia;
            //Cập nhật vào mảng
            giohang[i].soluong += 1;
            break;
        }
    }
    sessionStorage.setItem(CART, JSON.stringify(giohang));
    //Show ra html
    sl.value = slmoi.toString();

    //gán giá trị cho total
    //1.Xác định vị trí total
    const nextSibling = ongnoi.nextElementSibling;
    if (nextSibling) {
        const tt = nextSibling.children[0] as HTMLElement;
        tt.innerText = formatNumber(thanhtien);
    }
    const totalPriceElement = document.getElementById(
        "total-price"
    ) as HTMLElement;
    if (totalPriceElement) {
        (
            totalPriceElement.children[0] as HTMLElement
        ).innerText = `${formatNumber(tinhTongTien())}đ`;
    }
}

//Nút giảm (-) số lượng sản phẩm trong Cart
function giamsl(x: HTMLButtonElement): void {
    const ongnoi = x.parentNode as HTMLElement;
    const vt = parseInt((ongnoi.children[0] as HTMLInputElement).value);
    const sl = ongnoi.children[2] as HTMLInputElement;
    if (parseInt(sl.value) > 1) {
        let slmoi = 0;
        let thanhtien = 0;
        for (let i = 0; i < giohang.length; i++) {
            if (i === vt) {
                slmoi = giohang[i].soluong - 1;
                thanhtien = slmoi * giohang[i].gia;
                //Cập nhật vào mảng
                giohang[i].soluong -= 1;
                break;
            }
        }
        sessionStorage.setItem(CART, JSON.stringify(giohang));
        //Show ra html
        sl.value = slmoi.toString();

        //gán giá trị cho total
        //1.Xác định vị trí total
        const nextSibling = ongnoi.nextElementSibling;
        if (nextSibling) {
            const tt = nextSibling.children[0] as HTMLElement;
            tt.innerText = formatNumber(thanhtien);
        }
    } else {
        alert("Không thể giảm hơn được nữa");
    }
    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) {
        
        (
            totalPriceElement.children[0] as HTMLElement
        ).innerText = `${formatNumber(tinhTongTien())}đ`;
    }
}

// Hàm xóa sản phẩm ra khỏi giỏ hàng
function xoaSanPham(index: number): void {
    // Xóa sản phẩm khỏi mảng giỏ hàng dựa trên chỉ mục
    giohang.splice(index, 1);

    // Lưu giỏ hàng mới lên sessionStorage
    sessionStorage.setItem(CART, JSON.stringify(giohang));

    // Hiển thị lại giỏ hàng sau khi xóa
    showCart();

    // Kiểm tra độ dài của giỏ hàng sau khi xóa
    const totalPriceElement = document.getElementById("total-price");
    if (giohang.length === 0) {
        if (totalPriceElement) {
            (totalPriceElement.children[0] as HTMLElement).innerText = "0đ";
        }
    } else {
        if (totalPriceElement) {
            (
                totalPriceElement.children[0] as HTMLElement
            ).innerText = `${formatNumber(tinhTongTien())}đ`;
        }
    }
}

//Tổng tiền hóa đơn
function tinhTongTien() {
    var tongTien = 0;
    for (var i = 0; i < giohang.length; i++) {
        var sanPham = giohang[i];
        var thanhTien = sanPham.gia * sanPham.soluong;
        tongTien += thanhTien;
    }
    return tongTien;
}

// Hàm show dữ liệu lên giao diện
function showCart(): void {
    let kq: string = "";
    // Lấy dữ liệu trên sessionStorage về
    const gh: any[] | null = JSON.parse(sessionStorage.getItem(CART) ?? "null");
    // console.log(gh);
    if (gh && gh.length > 0) {
        for (let i: number = 0; i < gh.length; i++) {
            // Kiểm tra gh[i] không phải là null
            if (gh[i] !== null) {
                const total: number =
                    parseFloat(gh[i].gia) * parseInt(gh[i].soluong);
                kq += `
                    <tr>
                        <td>${gh[i].idProduct}</td>
                        <td>
                            <a href=".html" title="" class="thumb">
                                <img src="${gh[i].hinh}" alt="">
                            </a>
                        </td>
                        <td style="width:400px">
                            <a href=".html" title="" class="name-product line-clamp">${
                                gh[i].ten
                            }</a>
                        </td>
                        <td>${formatNumber(gh[i].gia)}đ</td>
                        <td>
                            <input type="hidden" value="${i}">
                            <button onclick="giamsl(this)" class="btn btn-sm btn-minus">
                                <i class="fa fa-minus"></i>
                            </button>
                            <input type="text" name="num-order" value="${
                                gh[i].soluong
                            }" class="num-order">
                            <button onclick="tangsl(this)" class="btn btn-plus">
                                <i class="fa fa-plus"></i>
                            </button>
                        </td>
                        <td><span>${formatNumber(total)}</span>đ</td>
                        <td>
                            <a onclick="xoaSanPham(${i})" title="" class="del-product"><i class="fa fa-trash-o"></i></a>
                        </td>
                    </tr>
                `;
            }
        }
        (document.getElementById("showCart") as HTMLElement).innerHTML = kq;
        soluongspCart(); 
        (
            document.getElementById("total-price")!.children[0] as HTMLElement
        ).innerText = `${formatNumber(tinhTongTien())}đ`;
    } else {
        // Nếu không có dữ liệu trong giỏ hàng
        document.getElementById("showCart")!.innerHTML =
            "Bạn chưa có sản phẩm nào trong giỏ hàng!";
    }
}

function soluongspCart() {
    //Hiển thị số lượng sp trong giỏ hàng
    (document.getElementById("num") as HTMLElement).innerText =
        giohang.length.toString();
}

function loadData() {
    soluongspCart();
    showttOrder();
    showInfoUser();
}

//====== CÁC HÀM SỬ LÝ GIÁ ========

// Hàm sử lý số liệu
function processNumber(inputString: string): number {
    // Loại bỏ dấu chấm trong chuỗi
    const processedString: string = inputString.replace(/\./g, "");
    const outputNumber: number = parseInt(processedString);
    return outputNumber;
}

function formatNumber(inputNumber: number): string {
    // Chuyển đổi số thành chuỗi
    const inputString: string = inputNumber.toString();

    // Kiểm tra độ dài của chuỗi
    const length: number = inputString.length;

    // Xác định số dấu chấm cần thêm vào
    const dotCount: number = Math.floor((length - 1) / 3);

    // Tạo một mảng các phần tử từ chuỗi
    const parts: string[] = inputString.split("");

    // Thêm dấu chấm vào chuỗi
    for (let i = 1; i <= dotCount; i++) {
        parts.splice(length - i * 3, 0, ".");
    }

    // Kết hợp các phần tử thành chuỗi mới
    const outputString: string = parts.join("");

    // Trả về chuỗi đã được định dạng
    return outputString;
}

//================= CHECKOUT =============
function showttOrder(): void {
    let kq = "";
    // Lấy dữ liệu trên sessionStorage về
    const gh = JSON.parse(sessionStorage.getItem(CART) ?? "[]");
    // console.log(gh);

    for (let i = 0; i < gh.length; i++) {
        const total = parseFloat(gh[i].gia) * parseInt(gh[i].soluong);
        kq += `
        <tr class="cart-item">
            <td class="product-name">${
                gh[i].ten
            }<strong class="product-quantity">x ${gh[i].soluong}</strong></td>
            <td class="product-total">${formatNumber(total)}đ</td>
        </tr>
        `;
    }
    const showttOrderElement = document.getElementById("showttOrder");
    if (showttOrderElement) {
        showttOrderElement.innerHTML = kq;
    }
    soluongspCart();
    const totalOrderElement = document.getElementById("total_order");
    if (totalOrderElement) {
        totalOrderElement.innerText = `${formatNumber(tinhTongTien())}đ`;
    }
}

function showInfoUser(): void {
    const infoUser = JSON.parse(sessionStorage.getItem("user") ?? "[]");
    // console.log(infoUser);

    const fullnameInput = document.getElementById(
        "fullname"
    ) as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const addressInput = document.getElementById("address") as HTMLInputElement;
    const phoneInput = document.getElementById("phone") as HTMLInputElement;
    const noteInput = document.getElementById("note") as HTMLInputElement;

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
