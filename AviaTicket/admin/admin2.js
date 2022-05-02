const locations = "";

function loadAllCards() {
    deleteCards();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://ramin000-001-site1.dtempurl.com/api/User/all", true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            const table_body = document.getElementById("tbodycls");
            console.log(data);
            for (let i = 0; i < data.length; ++i) {
                table_body.innerHTML += ` <tr id = "tr-${data[i].id}">
                <td data-column="from">${data[i].from}</td>
                <td data-column="to">${data[i].to}</td>
                <td data-column="ticketAmount">${data[i].ticketAmount}</td>
                <td data-column="time">${data[i].flightTime}</td>
                <td class="actions" style="display: flex;">
                  <a  class = "more-btn" href="#">More...</a>
                  <a class = "update-btn" href="#">Uptade</a>
                  <a id = "delete-${data[i].id}" class = "delete-btn" href="#"><i class="fa-solid fa-trash-can"></i></a>
                </td>
              </tr>`
            }
        }
    }

    xhr.send();
}

function addEvents() {
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = (e.target.getAttribute("id").slice(7, 8));
            document.getElementById("tr-" + id).remove();
            const xhr = new XMLHttpRequest();

            xhr.open("DELETE", "http://ramin000-001-site1.dtempurl.com/api/Admin/" + id, true);
            xhr.setRequestHeader("ApiKey", "gubahackatonbyramin");
            xhr.send();
        }
    })

    const add_btn = document.getElementById("addBtn");
    const popupAdd = document.getElementById("popup-add");
    const close_btn = document.getElementById("clsbtn2");
    const uploadToData_btn = document.getElementById("uploadtodata");
    add_btn.addEventListener('click', () => {
        popupAdd.style.display = "flex";
    })

    close_btn.addEventListener('click', () => {
        popupAdd.style.display = "none";
    })
    uploadToData_btn.addEventListener('click', addData);
}

function addData() {
    const _from = document.getElementById("from");
    const _to = document.getElementById("to");
    const _imgurl = document.getElementById("imageurl");
    const _time = document.getElementById("time");
    const _freebaggage = document.getElementById("freebaggage");
    const _handbag = document.getElementById("handbag");
    const _ticket_amount = document.getElementById("ticketAmount");
    const _discount = document.getElementById("discount");
    const _priceforadult = document.getElementById("priceforadult");
    const _priceforchildren = document.getElementById("priceforchildren");
    const _priceforbaby = document.getElementById("priceforbaby");
    const _meal = document.getElementById("meal");

    if (_from.value != "" || _to.value != "" || _time.value != "" || _freebaggage.value != "" || _ticket_amount.value != "" ||
        _imgurl != "" || _discount.value != "" || _priceforadult.value != "" || _priceforchildren.value != "" || _priceforbaby.value != "") {
        const object = {
            from: _from.value,
            to: _to.value,
            imageUrl: _imgurl.value,
            flightTime: _time.value,
            ticketAmount: _ticket_amount.value,
            ticketPriceForAdult: _priceforadult.value,
            ticketPriceForChildren: _priceforchildren.value,
            ticketPriceForBaby: _priceforbaby.value,
            discountPercentForAzerbaijanians: _discount.value,
            flightInformation: {
                freeBaggage: _freebaggage.value,
                handBag: String(_handbag.value),
                meals: _meal.value = "Meal" ? true : false,
                expireDate:"10 years"
            }
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://ramin000-001-site1.dtempurl.com/api/Admin");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("ApiKey", "gubahackatonbyramin");
        xhr.send(JSON.stringify(object));

        const inputs = document.querySelectorAll("input");
        for(let i = 0;i<inputs.length;++i){
            inputs[i].value = "";
        }
        
    }
}

function deleteCards() {
    let count = document.getElementById("tbodycls").children.length;
    while (count) {
        document.getElementById("tbodycls").childNodes[count--].remove();
    }
}


// function addTicket(){

// }


addEvents();
loadAllCards();