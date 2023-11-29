const moreButton = $$(".more");
moreButton.forEach(function (button) {
    button.onclick = function (e) {
        e.preventDefault();
        $("#resource-input-table").innerHTML +=
            '<tr><td> <input type="text" name="tenNguyenLieu" id="" /></td><td><input type="text" name="idNguyenLieu" id="" /></td><td><input type="number" name="soLuong" id="" /></td><td><input type="text" name="DonVi" id="" /></td><td><input type="number" name="DonGia" id="" /></td></tr>';
    };
});