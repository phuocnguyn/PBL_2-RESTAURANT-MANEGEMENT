function login() {
    // Lấy giá trị từ các trường input
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Tạo dữ liệu JSON để gửi lên server
    var data = JSON.stringify({ username: username, password: password });

    // Thực hiện request sử dụng Fetch API
    fetch("url_cua_api_login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }
            return response.json();
        })
        .then((data) => {
            // Đăng nhập thành công
            document.getElementById("result").innerText =
                "Login successful. Token: " + data.token;
        })
        .catch((error) => {
            // Xử lý lỗi đăng nhập thất bại
            document.getElementById("result").innerText = error.message;
        });
}
document.getElementById("summit-login-btn").onclick = function () {
    login();
};
