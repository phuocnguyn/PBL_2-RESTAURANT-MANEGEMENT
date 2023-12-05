fetch(
    "https://my-json-server.typicode.com/phuocnguyn/PBL_2-RESTAURANT-MANEGEMENT/Resource"
)
    .then(function (response) {
        return response.json();
    })
    .then(function (resources) {
        let resource_list = resources.map(function (resource) {
            return `
                    <tr>
                        <td align="center" >${resource.id}</td>
                        <td style="padding-left: 10px;">${resource.tenNguyenLieu}</td>
                        <td align="center">${resource.soLuong}</td>
                        <td align="center">${resource.donVi}</td>
                    </tr>
                `;
        });

        document.querySelector("#resource-list").innerHTML +=
            resource_list.join("");
    });
