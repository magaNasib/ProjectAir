"use strict";
class Main {
    btn = null;
    cards = null;
    locations = null;
    constructor() {
        this.btn = document.getElementById("searchBtn");
        this.clsBtn = document.getElementById("clsBtn");
        this.cards = document.getElementById("cards");
        this.locations = [];
    }
    //Load Locations
    loadAllCards() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://ramin000-001-site1.dtempurl.com/api/User/all", true);
        xhr.onload = () => xhr.status == 200 ? this.createCards(JSON.parse(xhr.responseText)) : "";
        xhr.send();
    }

    load(data, par) {
        const xhr = new XMLHttpRequest();
        if (par === "One Wary")
            xhr.open("POST", "http://ramin000-001-site1.dtempurl.com/api/User/search", true);
        else
            xhr.open("POST", "http://ramin000-001-site1.dtempurl.com/api/User/search", true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.onload = () => xhr.status == 200 ? this.createCards(JSON.parse(xhr.responseText)) : "";
    }
    //Delete Cards
    deleteCards() {
        let count = this.cards.childNodes.length - 1;
        while (count) {
            cards.childNodes[count--].remove();
        }
    }
    //Create Cards
    createCards(data) {
        console.log(data);
        this.deleteCards();
        this.locations = data;
        for (let i = 0; i < data.length; ++i) {
            const card = document.createElement("div");
            card.innerHTML = `
            <div class="img">
              <img src="${data[i].imageUrl}" alt="" />
            </div>
            <div class="content">
              <div class="top">
                <h5>${data[i].to}</h5>
                <div>
                  <del>${data[i].ticketPriceForAdult + 100}</del>
                  <span>${data[i].ticketPriceForAdult}</span>
                </div>
              `
            card.setAttribute("id", data[i].id);
            card.classList.add("card");
            this.cards.appendChild(card);
        }
    }
    //Close Ticket
    closeCard() {
        document.getElementById("popup").setAttribute("style","display:none");
    }
    //Buy Ticket
    buyTicket() {

    }
    //Filter
    filter() {
        const destinationFrom = document.getElementById("dF").value;
        const destinationTo = document.getElementById("dT").value;
        const price = document.getElementById("flightPrice").value;
        const time = document.getElementById("flightTime").value;
        let passengers = document.getElementById("passengers").value;
        const oneWay = document.getElementById("flightWay").value;
        if (destinationFrom != "" && destinationTo != "" && price != "" && time != "" && passengers > 0) {
            let info = {
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
            this.load(info, oneWay);
        }
    }
    //Local Storage
    addToLocal(data) {
        localStorage.setItem("Ticket", data);
    }

    //Check Element

    checkElement(target) {
        switch (target) {
            case this.btn:
                this.filter();
                return;
            case this.clsBtn:
                this.closeCard();
                return;
            case this.buyBtn:
                // this.
                return;
        }
        if (target.closest(".card")) {
            document.getElementById("popup").removeAttribute("style");
            this.updatePopUp(target.closest(".card").id);
        }
    }
    //Update PopUp
    updatePopUp(id) {
        for (let i = 0; i < this.locations.length; ++i) {
            if (this.locations[i].id == id) {
                const data = this.locations[i];
                const adultPrice = document.getElementById("adultprice");
                const childPrice = document.getElementById("childprice");
                const babyPrice = document.getElementById("babyprice");
                const totalPrice = document.getElementById("totalprice");
                const flightTime = document.getElementById("flighttime2");
                const freeBag = document.getElementById("freebag");
                const handBag = document.getElementById("handbag");
                
                const adult = document.getElementById("adult");
                const children = document.getElementById("children");
                const baby = document.getElementById("baby");
                

                
                const ticketAmount = document.getElementById("ticketamount");
                const destTo = document.getElementById("destTo");
                const destFrom = document.getElementById("destFrom");
                
                //Prices
                adultPrice.textContent = data.ticketPriceForAdult;
                childPrice.textContent = data.ticketPriceForChildren;
                babyPrice.textContent = data.ticketPriceForBaby;
                destTo.textContent = data.to;
                destFrom.textContent = data.from;
                ticketAmount.textContent = data.ticketAmount;
                
                //Time
                flightTime = data.flightTime;
                //Bag
                freeBag = data.freeBag;


            }
        }
    }
    //Add Events
    addEvents() {
        document.body.addEventListener("click", (e) => this.checkElement(e.target));
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