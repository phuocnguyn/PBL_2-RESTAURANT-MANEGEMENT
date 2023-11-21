const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

fetch(
    "https://my-json-server.typicode.com/phuocnguyn/PBL_2-RESTAURANT-MANEGEMENT/bill"
)
    .then(function (response) {
        return response.json();
    })
    .then(function (Resource) {
        // bill
        let resource_list = Resource.map(function (resource) {
            return `
                    <div id="bill-${resource.id}"class="col-3 card ">
                        <div class="card-header">ID hóa đơn: ${resource.id}</div>
                        <div class="card-body">
                            Thời gian: ${resource.thoiGian} <br />
                            Tạo bởi: ${resource.taoBoi}<br />
                            Mã NV: ${resource.maNV} <br />
                            Thành tiền: ${resource.tongCong}<br />
                        </div>
                        <div class="card-footer d-grid">
                            <button id="open-detail-bill-id${resource.id}"class="btn btn-outline-success">Chi tiết</button>
                        </div>
                    </div>
                `;
        });
        resource_list = resource_list.join("");
        $("#bill-list").innerHTML = resource_list;

        // detail bill
        let detail_bill_list = Resource.map(function (resource) {
            return `
            <div
                id="detail-bill-${resource.id}"
                class="card new-layer detail-bill"
                style="display: none;z-index: 1000;"
            >
                <div class="container">
                    <div class="card-header">
                        <button class="close-${resource.id} float-end p-1 mt-3">
                            <i class="ti-close"></i>
                        </button>
                        <h4 class="text-center">Hóa đơn ID${resource.id}</h4>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr class="table-success">
                                    <th style="padding-left: 10px">
                                        Tên món ăn
                                    </th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody
                                class="table-detail-bill-${resource.id}"
                            ></tbody>
                        </table>
                        <div class="row">
                            <div class="col-6 bill-img">
                                <img src="./img/QRcode.jpg" alt="" />
                            </div>
                            <div class="col-6">
                                Thành tiền: ${resource.thanhTien} <br />
                                % Khuyến mãi: ${resource.phanTramKhuyenMai}
                                <br />
                                Khuyến mãi: ${resource.khuyenMai} <br />
                                Tổng tiền:${resource.tongCong} <br />
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <h4 class="text-center">
                            Cảm ơn Quý khánh đã ủng hộ nhà hàng của chúng tôi!
                        </h4>
                    </div>
                </div>
            </div>
            `;
        });
        detail_bill_list = detail_bill_list.join("");
        $(".detail-bill-list").innerHTML = detail_bill_list;

        Resource.forEach(function (resource) {
            let items = resource.items.map(function (i) {
                return `
                    <tr>
                        <td style="padding-left: 10px">${i.tenMon}</td>
                        <td>${i.soLuong}</td>
                        <td>${i.donGia}</td>
                        <td>${i.thanhTienItem}</td>
                    </tr>
                `;
            });

            items = items.join("");

            let table_detail_bill = `.table-detail-bill-${resource.id}`;

            $(`.table-detail-bill-${resource.id}`).innerHTML = items;

            $(`#open-detail-bill-id${resource.id}`).onclick = function () {
                $(`#detail-bill-${resource.id}`).style.display = "flex";
            };
            $(`.close-${resource.id}`).onclick = function () {
                $(`#detail-bill-${resource.id}`).style.display = "none";
            };
        });
    });

const moreButton = $$(".more");
moreButton.forEach(function (button) {
    button.onclick = function (e) {
        e.preventDefault();
        $("#resource-input-table").innerHTML +=
            '<tr><td> <input type="text" name="" id="" /></td><td><input type="text" name="" id="" /></td><td><input type="number" name="" id="" /></td><td><input type="text" name="" id="" /></td><td><input type="number" name="" id="" /></td></tr>';
    };
});

const closeButtons = $$(".close");
closeButtons.forEach(function (close) {
    close.onclick = function () {
        $$(".new-layer").forEach(function (layer) {
            layer.style.display = "none";
        });
    };
});
