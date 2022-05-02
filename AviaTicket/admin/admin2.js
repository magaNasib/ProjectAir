const locations="";

function loadAllCards() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://ramin000-001-site1.dtempurl.com/api/User/all", true);
    xhr.onload = () => xhr.status == 200 ? createCards(xhr.responseText) : "";
    xhr.send();
}

function createCards(data) {
    location = data;

    // for (let i = 0; i < data.length; ++i) {
    //     `
    //     <tr>
    //     <td data-column="from">Baku</td>
    //     <td data-column="to">Ganja</td>
    //     <td data-column="amount">10</td>
    //     <td data-column="time">2022.10.25</td>
    //     <td class="actions" style="display: flex;">
    //       <a href="#">More...</a>
    //       <a href="#">Uptade</a>
    //       <a href="#"><i class="fa-solid fa-trash-can"></i></a>
    //     </td>
    //   </tr>
    //   `
    // }
}


//#region main
loadAllCards();
//#endregion