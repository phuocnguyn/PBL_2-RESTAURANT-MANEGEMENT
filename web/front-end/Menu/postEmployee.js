function handleSubmit(event) {
    event.preventDefault();
    const maNV = $("#maNV").value;
    const hoVaTen = $("#hoVaTen").value;
    const gioiTinh = $("#sex").value;
    const email = $("#email").value;
    const birthday = $("#birthday").value;
    const CCCD = $("#CCCD").value;
    const thuongTru = $("#thuongTru").value;
    const job = $("#job").value;

    let success = false;

    let employee_infor = {
        maNV: maNV,
        hoVaTen: hoVaTen,
        gioiTinh: gioiTinh,
        email: email,
        birthday: birthday,
        CCCD: CCCD,
        thuongTru: thuongTru,
        job: job,
    };
    console.log(employee_infor);
    fetch("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee_infor),
    });
}

$(".employee-confirm").addEventListener("click", function () {
    handleSubmit(event);
});
