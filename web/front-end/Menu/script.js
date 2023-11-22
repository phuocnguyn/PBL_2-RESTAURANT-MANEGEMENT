const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

fetch(
    "https://my-json-server.typicode.com/phuocnguyn/PBL_2-RESTAURANT-MANEGEMENT/dishes"
)
    .then(function (response) {
        return response.json();
    })
    .then(function (dishes) {
        let dishes_list = dishes.map(function (dish) {
            return `
            <div class="col-3 dish MonAn${dish.idNhomMonAn}">
                <img
                src="${dish.linkAnh}"
                alt=""
                />
                <div class="dish-info">
                    <div class="name">
                        <i class="ti-info-alt"></i> ${dish.tenMon}
                    </div>
                    <div class="prize"><i class="ti-money"></i>${dish.giaMon}VNĐ</div>
                    <div class="resource">
                        <i class="ti-hand-point-right"></i> ${dish.thanhPhan}
                    </div>
                
                    <input class="idMonAn" name="idMonAn" type = "text " value = ${dish.idNhomMonAn} />
                    <input class="giaMon" name="giaMon" type = "number" value = ${dish.giaMon} />
                    <div class="form-floating">
                        <input class="form-control" name="soLuong-dish-${dish.id}"  type="number" value=0 
                        id="soLuong-dish-${dish.id}"
                        placeholder="Nhập số lượng" />
                        <label class="ml-2" for="soLuong-dish-${dish.id}">Số lượng</label>
                    </div>
                </div>
                
            </div>
            `;
        });
        dishes_list = dishes_list.join("");

        document.querySelector("#dish-list").innerHTML = dishes_list;

        const tabs = $$(".tab-item");
        const line = $(".line");
        const dishList = $$(".dish");
        tabs.forEach((tab) => {
            if (tab.classList.value == "all tab-item active") {
                dishList.forEach(function (dish) {
                    dish.style.display = "none";
                    dish.style.display = "block";
                });
            }
            tab.onclick = function () {
                $(".tab-item.active").classList.remove("active");

                line.style.left = this.offsetLeft + "px";
                line.style.width = this.offsetWidth + "px";

                this.classList.add("active");
                if (this.classList.value == "all tab-item active") {
                    dishList.forEach(function (dish) {
                        dish.style.display = "none";
                        dish.style.display = "block";
                    });
                }
                if (this.classList.value == "food tab-item active") {
                    dishList.forEach(function (dish) {
                        dish.style.display = "none";
                        if (dish.classList.contains("MonAn1")) {
                            dish.style.display = "block";
                        }
                    });
                }

                if (this.classList.value == "water tab-item active") {
                    dishList.forEach(function (dish) {
                        dish.style.display = "none";
                        if (dish.classList.contains("MonAn2")) {
                            dish.style.display = "block";
                        }
                    });
                }
            };
            return dishes;
        });
        return dishes;
    })
    .then(function (dishes) {
        function handleSubmit(event) {
            let success = true;
            // Ngăn chặn form submit theo cách thông thường
            dishes.forEach(function (dish, index) {
                var idOrder = document.getElementById("idOrder").value;
                var maNV = document.getElementById("maNVorder").value;
                var soBan = document.getElementById("soBan").value;
                var phanTramKhuyenMai =
                    document.getElementById("phanTramKhuyenMai").value;
                var ghiChu = document.getElementById("ghiChu").value;
                var soLuong = document.getElementById(
                    `soLuong-dish-${index + 1}`
                ).value;

                // Dữ liệu để gửi lên API
                var data = {
                    idOrder: idOrder,
                    maNV: maNV,
                    soBan: soBan,
                    trangThaiMon: "undone",
                    idMonAn: index + 1,
                    giaMon: dish.giaMon,
                    soLuong: soLuong,
                    phanTramKhuyenMai: phanTramKhuyenMai,
                    ghiChu: ghiChu,

                    // Thêm các trường dữ liệu khác nếu cần
                };
                console.log(data);

                if (data.soLuong > 0) {
                    fetch("http://localhost:5225/api/Order/PostOrder", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Network response was not ok");
                            }
                            return response.json(); // hoặc response.text() nếu kết quả không phải JSON
                        })
                        .then((data) => {
                            // Xử lý kết quả khi request thành công
                            success = true;
                        })
                        .catch((error) => {
                            // Xử lý lỗi nếu request không thành công
                            success = false;
                        });
                }
            });
            // Lấy giá trị từ các trường form
            if (success)
                $("body").innerHTML += `
                <div class="alert alert-success alert-dismissible">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Success!</strong> Đặt món thành công!
                </div>
                `;
            else
                $("body").innerHTML += `
            <div class="alert alert-danger alert-dismissible">
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                <strong>Fail!</strong> Đặt món không thành công do lỗi API!
            </div>
            `;
        }
        // Lắng nghe sự kiện submit trên form và gọi hàm xử lý
        $(".orderForm-submit-btn").addEventListener("click", function () {
            handleSubmit();
        });
    });

fetch(
    "https://my-json-server.typicode.com/phuocnguyn/PBL_2-RESTAURANT-MANEGEMENT/Resource"
)
    .then(function (response) {
        return response.json();
    })
    .then(function (Resource) {
        let resource_list = Resource.map(function (resource) {
            return `
                    <tr>
                        <td align="center" >${resource.id}</td>
                        <td style="padding-left: 10px;">${resource.tenNguyenLieu}</td>
                        <td align="center">${resource.soLuong}</td>
                        <td align="center">${resource.donVi}</td>
                    </tr>
                `;
        });
        resource_list = resource_list.join("");
        document.querySelector("#resource-list").innerHTML += resource_list;
    });

const moreButton = $$(".more");
moreButton.forEach(function (button) {
    button.onclick = function (e) {
        e.preventDefault();
        $("#resource-input-table").innerHTML +=
            '<tr><td> <input type="text" name="tenNguyenLieu" id="" /></td><td><input type="text" name="idNguyenLieu" id="" /></td><td><input type="number" name="soLuong" id="" /></td><td><input type="text" name="DonVi" id="" /></td><td><input type="number" name="DonGia" id="" /></td></tr>';
    };
});

function openPart(button, htmlNode) {
    button.onclick = function (e) {
        $$(".part").forEach(function (part) {
            part.style.display = "none";
        });
        e.preventDefault();
        htmlNode.style.display = "block";
    };
}
openPart($("#employee-part"), $("#employee"));
openPart($("#work-shift-part"), $("#work-shift"));
openPart($("#wage-part"), $("#wage"));
openPart($("#bill-part"), $("#bill"));
openPart($("#storage-part"), $("#storage"));
openPart($("#resource-input-part"), $("#resource-input"));
