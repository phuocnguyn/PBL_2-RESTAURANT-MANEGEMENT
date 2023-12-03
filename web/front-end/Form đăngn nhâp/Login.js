function login(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = {
        username: username,
        password: password,
    };
    console.log(user);
    fetch("http://localhost:5225/api/NhanVien/PostNhanVien", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Tài khoản không chính xác");
            }
            return response.json();
        })
        .then((data) => {
            // Đăng nhập thành công
            window.location.href = "./menu.html";
        })
        .catch((error) => {
            // Xử lý lỗi đăng nhập thất bại
            document.getElementById("result").innerText = error.message;
        });
}

document.getElementById("submit-login-btn").onclick = function () {
    login(event);
};
