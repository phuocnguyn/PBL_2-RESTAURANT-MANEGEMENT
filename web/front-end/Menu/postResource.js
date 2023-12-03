function handleSubmit(event) {
    event.preventDefault();
    const maND = $("#maNV").value;
    const hoVaTen = $("#hoVaTen").value;
    const gioiTinh = $("#sex").value;
    const email = $("#email").value;
    const birthday = $("#birthday").value;
    const CCCD = $("#CCCD").value;
    const thuongTru = $("#thuongTru").value;
    const job = $("#job").value;

    let success = false;

    let employee_infor = {
        hoTen: hoVaTen,
        gioiTinh: gioiTinh,
        email: email,
        ngaySinh: birthday,
        cccd: CCCD,
        thuongTru: thuongTru,
        chucVu: job,
        maNV: maNV
    };
    console.log(employee_infor);
    fetch("http://localhost:5225/api/NhanVien/PostNhanVien", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee_infor),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(
                "Network response was not ok"
            );
        }

        return response.json();
    })
    .then((orderItem) => {
        success = true;
        $("body").innerHTML += `
                <div class="alert alert-success alert-dismissible">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Success!</strong> Lưu món thành công!
                </div>
                `;
    })
    .catch((error) => {
        success = false;
        $("body").innerHTML += `
                    <div class="alert alert-danger alert-dismissible">
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        <strong>Fail!</strong> Lưu món không thành công do lỗi API!
                    </div>
                    `;
    });

}

$(".employee-confirm").addEventListener("click", function () {
    handleSubmit(event);
});
