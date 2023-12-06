function SubmitResourceBill(event) {
    event.preventDefault();
    $$(".input-row").forEach(function (bill) {
        document.addEventListener("DOMContentLoaded", function () {
            

        
            inputElements.forEach(function (inputElement) {
                var postData = {};
                var name = inputElement.getAttribute("class");
                var value = inputElement.value;
                postData[name] = value;
            });
            console.log(postData);
            // Định nghĩa URL mà bạn muốn gửi yêu cầu POST đến
            var postUrl = "https://example.com/api/post-endpoint";

            // Sử dụng fetch để gửi yêu cầu POST
            fetch(postUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            })
                .then((response) => response.json())
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
        });
    });
}

$("#btn-submit-resource-bill").addEventListener("click", function (event) {
    SubmitResourceBill(event);
});
