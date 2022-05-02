"use strict";

//#region Variables
const btn = document.getElementById("searchBtn");
const close_btn = document.getElementById("close-btn");
const cards = document.getElementById("cards");
const popup = document.getElementById("popup");
const checkout_btn = document.getElementById("chkout");
let maxValue = 0;
let locations = null;
let dropdownList = [];
//#endregion

//#region  Cards' Functions 
//Load All Cards
function createCards(cards_data) {
    locations = cards_data;
    for (let i = 0; i < cards_data.length; ++i) {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="img">
          <img src="${cards_data[i].imageUrl}" alt="" />
        </div>
        <div class="content">
          <div class="top">
            <h5>${cards_data[i].to}</h5>
            <div>
              <span>${cards_data[i].ticketPriceForAdult} AZN</span>
            </div>
          `
        card.setAttribute("id", cards_data[i].id);
        card.classList.add("card");
        cards.appendChild(card);
    }
}

function loadAllCards() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://ramin000-001-site1.dtempurl.com/api/User/all", true);
    xhr.onload = () => xhr.status == 200 ? createCards(JSON.parse(xhr.responseText)) : "";
    xhr.send();
}
//Load Card
function loadCard(data, par) {
    const xhr = new XMLHttpRequest();
    deleteCards();
    if (par == "One way") {
        xhr.open("POST", "http://ramin000-001-site1.dtempurl.com/api/User/search", true);
    } else {
        xhr.open("POST", "http://ramin000-001-site1.dtempurl.com/api/User/twowaysearch", true);
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onload = () => xhr.status == 200 ? createCards(JSON.parse(xhr.responseText)) : "";
}
//Delete Cards
function deleteCards() {
    let count = cards.childNodes.length - 1;
    while (count) {
        cards.childNodes[count--].remove();
    }
}

//Filters cards
function filterCards() {
    const destinationFrom = document.getElementById("dF").value;
    const destinationTo = document.getElementById("dT").value;
    const price = document.getElementById("flightPrice").value;
    const time = document.getElementById("flightTime").value;
    let passengers = document.getElementById("passengers").value;
    const oneWay = document.getElementById("flightWay").value;
    if (destinationFrom != "" && destinationTo != "" && price != "" && time != "" && passengers > 0) {
        let data = {
            from: destinationFrom,
            to: destinationTo,
            startDate: time.slice(0, 16),
            serviceType: 0,
            citizenshipType: 0,
            passenger: {
                "adult": passengers,
                "children": 0,
                "baby": 0
            }
        }
        loadCard(data, oneWay);
    }
}
//#endregion

//Closing Popup
function closePopUp() {
    popup.setAttribute("style", "display:none");
}

//Local Storage
function addToLocal(data) {
    sessionStorage.setItem("Ticket", data);
}
//Events
function addEvents() {
    document.body.addEventListener("click", (e) => checkElement(e.target));

    
    
    close_btn.addEventListener('click', () => closePopUp());
    const baby = document.getElementById("baby");
    const children = document.getElementById("children");
    const adult = document.getElementById("adult");
    const destFrom = document.getElementById("dF");
    const destTo = document.getElementById("dT");
    
    destFrom.addEventListener('keyup',()=> getDropdown(destFrom.value));
    destTo.addEventListener('keyup',()=> getDropdown(destTo.value));


    baby.addEventListener('input', () => {
        calculate(baby.value, children.value, adult.value, locations[popup.getAttribute("name") - 1]);
        baby.value = checkInputMin(baby.value, maxValue);
    });
    children.addEventListener('input', () => {
        calculate(baby.value, children.value, adult.value, locations[popup.getAttribute("name") - 1]);
        children.value = checkInputMin(children.value, maxValue);
    });
    adult.addEventListener('input', () => {
        calculate(baby.value, children.value, adult.value, locations[popup.getAttribute("name") - 1]);
        adult.value = checkInputMin(adult.value, maxValue);
    });

}
//Check Element
function checkElement(target) {
    let temp = target.closest(".card");
    if (target == btn) {
        filterCards();
    } else if (target.classList.contains("minus") || target.classList.contains("plus")) {
        inceaseAndDecrease(target)
    } else if (temp) {
        updatePopUp(temp.getAttribute("id"));
        popup.setAttribute("style", "display:flex");
    }
}
//Update PopUp
function updatePopUp(id) {
    resetPopUp();
    const data = locations[id - 1];
    popup.setAttribute("name", id);
    //Prices and about Flight
    const adultPrice = document.getElementById("adultprice");


    const adult = document.getElementById("adult");
    const baby = document.getElementById("baby");
    const children = document.getElementById("children");

    maxValue = data.ticketAmount;

    const childPrice = document.getElementById("childprice");
    const babyPrice = document.getElementById("babyprice");
    const flightTime = document.getElementById("flighttime2");
    const freeBag = document.getElementById("freebag");
    const handBag = document.getElementById("handbag");

    //Default Value
    const totalPrice = document.getElementById("totalprice");
    totalPrice.textContent = "0 AZN";

    //Image
    const bckg = document.getElementById("bckgpopup");
    bckg.src = data.imageUrl;

    //Amount To and From    
    const destTo = document.getElementById("destTo");
    const destFrom = document.getElementById("destFrom");

    //Prices
    adultPrice.textContent = data.ticketPriceForAdult + " AZN";
    childPrice.textContent = data.ticketPriceForChildren + " AZN";
    babyPrice.textContent = data.ticketPriceForBaby + " AZN";
    destTo.textContent = data.to;
    destFrom.textContent = data.from;


    //Time
    flightTime.textContent = data.flightTime.slice(0, 4) + '-' + data.flightTime.slice(5, 7) + '-' + data.flightTime.slice(8, 10);
    //Bag
    freeBag.textContent = data.flightInformation.freeBaggage;
    handBag.textContent = data.flightInformation.handBag;
}

//Calculate
function calculate(baby_value, children_value, adult_value, data) {
    let sum = 0;
    let _amount = Number(baby_value) + Number(children_value) + Number(adult_value);
    sum += baby_value * data.ticketPriceForBaby + children_value * data.ticketPriceForChildren + adult_value * data.ticketPriceForAdult;
    if (_amount > 0) {
        addToLocal(JSON.stringify({
            _totalPrice: sum,
            amount: _amount
        }));
    }
    document.getElementById("totalprice").textContent = sum + " AZN";
}

function inceaseAndDecrease(par) {
    const parent = par.parentNode;
    const baby = Number(document.getElementById("baby").value);
    const children = Number(document.getElementById("children").value);
    const adult = Number(document.getElementById("adult").value);
    let count = Number(parent.children[1].value);

    if (par.classList.contains("minus")) {
        if (parent.children[1].value > 0) {
            --count;
        }
    } else if (par.classList.contains("plus")) {
        if (baby + children + adult < locations[popup.getAttribute("name") - 1].ticketAmount) {
            ++count;
        }
    }
    parent.children[1].value = count;
    console.log(maxValue);
    maxValue = locations[popup.getAttribute("name") - 1].ticketAmount - baby + children + adult
    parent.children[1].value = checkInputMin(parent.children[1].value, maxValue);
    console.log(maxValue);
    calculate(baby, children, adult, locations[popup.getAttribute("name") - 1]);
}

function resetPopUp() {
    const baby = document.getElementById("baby");
    const children = document.getElementById("children");
    const adult = document.getElementById("adult");
    baby.value = 0;
    children.value = 0;
    adult.value = 0;
}

function checkInputMin(value, max) {
    if (value >= max)
        return max;

    return value;
}

//Dropdown
function getDropdown(par) {
    if(par == "")
        return;
        
    dropdownList = [];
    for (let i = 0; i < locations.length; ++i) {
        console.log(locations[i].from.indexOf(par));
        if(locations[i].from.indexOf(par) > 0){
            console.log(locations[i].from);
            dropdownList.push(locations[i].from);
        }
    }
    console.log(dropdownList);
}



//#region main
function main() {
    loadAllCards();
    addEvents();
}
main();
//#endregion