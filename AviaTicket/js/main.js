"use strict";
class Main {
    btn = null;
    cards = null;
    locations;
    constructor() {
        this.btn = document.getElementById("searchBtn");
        this.cards = document.getElementById("cards");
        this.locations = [];
    }
    //Load Locations
    loadAllCards(){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://ramin000-001-site1.dtempurl.com/api/User/all", true);
        xhr.onload = () => xhr.status == 200 ? this.createCards(JSON.parse(xhr.responseText)) : "";
        xhr.send();
    }

    load(data) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://ramin000-001-site1.dtempurl.com/api/User/search", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.onload = () => xhr.status == 200 ? this.createCards(JSON.parse(xhr.responseText)) : "";
    }
    //Delete Cards
    deleteCards() {
        let count = this.cards.childNodes.length - 1;
        console.log(count);
        while (count) {
            cards.childNodes[count--].remove();
        }
    }
    //Create Cards
    createCards(data) {
        for (let i = 0; i < data.length; ++i) {
            const card = document.createElement("div");
            card.innerHTML = `
            <div class="img">
              <img src="images/${data[i].to}.jpg" alt="" />
            </div>
            <div class="content">
              <div class="top">
                <h5>${data[i].to}</h5>
                <div>
                  <del>${data[i].ticketPriceForAdult + 100}</del>
                  <span>${data[i].ticketPriceForAdult}</span>
                </div>
              `
            card.classList.add("card");
            this.cards.appendChild(card);
        }
    }


    //Filter
    filter() {
        const destinationFrom = document.getElementById("dF").value;
        const destinationTo = document.getElementById("dT").value;
        const price = document.getElementById("flightPrice").value;
        const time = document.getElementById("flightTime").value;
        const oneWay = document.getElementById("flightWay").value;

        this.deleteCards();

        if (destinationFrom != "" && destinationTo != "" && price != "" && time != "") {
            let info = {
                from: destinationFrom,
                to: destinationTo,
                startDate: "2022-05-05T15:34:49.3697524",
                serviceType: 0,
                citizenshipType: 0,
                passenger: {
                    "adult": 1,
                    "children": 0,
                    "baby": 0
                }
            }
            this.load(info);
        }
    }


    //Add Events
    addEvents() {
        document.body.addEventListener("click", (e) => e.target == this.btn ? this.filter() : "");
    }
    //Main Function
    run() {
        this.loadAllCards();
        this.addEvents();
    }
}


//#region main
const main = new Main();
main.run();
//#endregion