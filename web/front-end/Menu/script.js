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
            <div class="col l-3 dish MonAn${dish.idNhomMonAn}">
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
                    <input name="soLuong"  type="number" value=0 placeholder="Nhập số lượng" />
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
        document.querySelector("#resource-list").innerHTML =
            '<tr><td align="center">Mã nguyên liệu</td><td >Tên nguyên liệu</td><td align="center">Số lượng</td><td align="center">Đơn vị</td></tr>' +
            resource_list;
    });

const moreButton = $$(".more");
moreButton.forEach(function (button) {
    button.onclick = function (e) {
        e.preventDefault();
        $("#resource-input-table").innerHTML +=
            '<tr><td> <input type="text" name="" id="" /></td><td><input type="text" name="" id="" /></td><td><input type="number" name="" id="" /></td><td><input type="text" name="" id="" /></td><td><input type="number" name="" id="" /></td></tr>';
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



function handleSubmit(event) {
    
    // Ngăn chặn form submit theo cách thông thường

    // Lấy giá trị từ các trường form
    var idOrder = document.getElementById('idOrder').value;
    var maNV = document.getElementById('maNV').value;
    var soBan = document.getElementById('soBan').value;
    var phanTramKhuyenMai = document.getElementById('phanTramKhuyenMai').value;
    var ghiChu = document.getElementById('ghiChu').value;

    // Dữ liệu để gửi lên API
    var data = {
        idOrder: idOrder,
        maNV: maNV,
        soBan: soBan,   
        trangThaiMon: "undone",
        idMonAn: 1,
        giaMon: 1000,
        phanTramKhuyenMai: phanTramKhuyenMai,
        ghiChu: ghiChu
        // Thêm các trường dữ liệu khác nếu cần
    };
    console.log(data);

    // Gửi API POST request
    fetch('http://localhost:5225/api/Order/PostOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // hoặc response.text() nếu kết quả không phải JSON
    })
    .then(data => {
        // Xử lý kết quả khi request thành công
        console.log(data);
    })
    .catch(error => {
        // Xử lý lỗi nếu request không thành công
        console.error('Error:', error);
    });
}
let orderForm_submit_btn = $('.orderForm-submit-btn')
// Lắng nghe sự kiện submit trên form và gọi hàm xử lý
orderForm_submit_btn.onclick = function (){
    handleSubmit();
}
