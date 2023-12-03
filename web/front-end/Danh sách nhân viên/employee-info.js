const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

fetch("http://localhost:5225/api/NhanVien/GetNhanVien")
    .then(function (response) {
        return response.json();     
    })
    .then(function (infor_list) {
        // bill
        let infors = infor_list.map(function (infor) {
            return `
                <tr>
                    <td class="text-center">${infor.maNV}</td>
                    <td>${infor.hoTen}</td>
                    <td class="text-center">${infor.gioiTinh}</td>
                    <td class="text-center">${infor.cccd}</td>

                    <td>${infor.thuongTru}</td>
                    <td>${infor.email}</td>

                    <td class="text-center">${infor.ngaySinh}</td>
                    <td class="text-center">${infor.chucVu}</td>
                    <td
                        class="d-flex align-items-center justify-content-center"
                    >
                        <button class="btn btn-info me-2"></button
                        ><button id="delete-${infor.maNV}" class="btn btn-danger"></button>
                    </td>
                </tr>
            `;
        });

        $("#employee-info").innerHTML = infors.join("");
        return infor_list
    })





    .then((infor_list) => {
        infor_list.forEach((infor,index)=>{
            $(`#delete-${infor.maNV}`).onclick = function(){
                console.log(index)
                fetch(`http://localhost:5225/api/NhanVien/DeleteNhanVien/${infor.maNV}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                
                    },

                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Delete failed.');
                    }
                    location.reload();
                    console.log('Record deleted successfully.');
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });
            }
        })
    });


