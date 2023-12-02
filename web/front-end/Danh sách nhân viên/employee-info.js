const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

fetch("")
    .then(function (response) {
        return response.json();
    })
    .then(function (infor_list) {
        // bill
        let infors = infor_list.map(function (infor) {
            return `
                <tr>
                    <td class="text-center">${infor.maNV}</td>
                    <td>${infor.maNV}</td>
                    <td class="text-center">${infor.maNV}</td>
                    <td>${infor.maNV}</td>
                    <td class="text-center">${infor.maNV}</td>
                    <td class="text-center">${infor.maNV}</td>
                    <td
                        class="d-flex align-items-center justify-content-center"
                    >
                        <button class="btn btn-info me-2"></button
                        ><button class="btn btn-danger"></button>
                    </td>
                </tr>
            `;
        });

        $("#employee-info").innerHTML = infors.join("");
    });


