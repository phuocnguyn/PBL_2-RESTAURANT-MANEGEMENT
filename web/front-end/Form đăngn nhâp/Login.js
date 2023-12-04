function login(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = {
        username: username,
        password: password,
    };

    fetch("http://localhost:5225/api/Login/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message == 1) {
                window.location.href = "./web/front-end/Menu/Menu.html";
            } else {
                function showSuccessToast() {
                    toast({
                        title: "Thất bại!",
                        message: "Mật khẩu hoặc tài khoản của bạn đã sai!",
                        type: "error",
                        duration: 5000,
                    });
                }
                showSuccessToast();
            }
        })
        .catch((error) => {
            console.error("Error:");
            function showSuccessToast() {
                toast({
                    title: "Thất bại!",
                    message: "Mật khẩu hoặc tài khoản của bạn đã sai!",
                    type: "error",
                    duration: 5000,
                });
            }
            showSuccessToast();
        });
}

document.getElementById("submit-login-btn").onclick = function () {
    login(event);
};
