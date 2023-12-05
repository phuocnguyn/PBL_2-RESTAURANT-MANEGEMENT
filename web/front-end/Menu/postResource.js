function SubmitResourceBill(event) {
    event.preventDefault();

    let bill = {
        id: ,
        gio ,
        ngay ,
        tongCong
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
                throw new Error("Network response was not ok");
            }

            return response.json();
        })
        .then((orderItem) => {
            function showSuccessToast() {
                toast({
                    title: "Đăng kí thành công!",
                    message: "Đã thêm hóa đơn vào danh sách",
                    type: "success",
                    duration: 5000,
                });
            }
            showSuccessToast();
        })
        .catch((error) => {
            function showSuccessToast() {
                toast({
                    title: "Thất bại!",
                    message: "Thêm hóa đơn thất bại do lỗi API",
                    type: "error",
                    duration: 5000,
                });
            }
            showSuccessToast();
        });
}

$("#btn-submit-resource-bill").addEventListener("click", function (event) {
    SubmitResourceBill(event);
});
