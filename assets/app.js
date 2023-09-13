class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.pre = null;
    }
}


class LinkedList {
    constructor(head = null) {
        this.head = head;
        this.length = 0;
    }

    push(data) {
        let node = new ListNode(data);
        if (this.head == null) {
            node.next = this.head;
            this.head = node;
        }
        else {
            this.head.pre = node;
            node.next = this.head;
            this.head = node;
        }



        this.length += 1;
        return this;
    }

    size() {
        return this.length;
    }

    clear() {
        this.head = null;
        this.length = 0;
    }

    getFirst() {
        return this.head;
    }

}


class CardDeck {
    constructor() {
        this.length = 54;
        this.deckOfCards = [...Array(54).keys()];
        this.currentIndex = 0;
    }

    shuffleDeck() {
        const array = this.deckOfCards;
        let m = array.length, temp, current;

        while (m) {
            current = Math.floor(Math.random() * m--);

            temp = array[m];
            array[m] = array[current];
            array[current] = temp;
        }
        this.currentIndex = 0
    }


    currentCard() {
        return this.deckOfCards[this.currentIndex];
    }

    nextCard() {
        this.currentIndex += 1;
    }

}


function toggleVisibility(element) {

    if (element.style.display == "none") {
        element.style.display = "inline"
    }
    else {
        element.style.display = "none"
    }
}

// Initialize a new deck of cards
const deck = new CardDeck();

// Initialize a new list to store cards previously shown
const list = new LinkedList();


// Shuffle the deck at the start
deck.shuffleDeck()

// Add the first card to the list
list.push(deck.currentCard())

// Set a trav variable to null; Keeps track of current location as we browse the linked list.
let trav = null;



let activeCard = document.querySelector("#active-card");
let nextBtn = document.querySelector("#next-btn")
let reshuffleBtn = document.querySelector("#reshuffle")

let historyBtn = document.querySelector("#history-btn")
let historyCard = document.querySelector("#history-active-card")
let hPrevBtn = document.querySelector("#history-prev-btn")
let hNextBtn = document.querySelector("#history-next-btn")

let container = document.querySelector(".container");

activeCard.setAttribute("src", `./assets/images/${deck.currentCard()}.jpg`)

nextBtn.addEventListener("click", () => {
    deck.nextCard()
    if (deck.currentIndex < deck.length) {
        list.push(deck.currentCard())
        activeCard.setAttribute("src", `./assets/images/${deck.currentCard()}.jpg`);
        // console.log(deck.currentIndex);
    }
    else {
        console.log("End of the Deck");
    }
});


historyBtn.addEventListener("click", () => {
    // Get the value of the head of the list and assign it to trav

    trav = list.head;

    historyCard.setAttribute("src", `./assets/images/${trav.data}.jpg`);
    hNextBtn.style.display = "none";
    if (list.length < 2) {
        hPrevBtn.style.display = "none";
    }
    else {
        hPrevBtn.style.display = "inline";
    }

});

hNextBtn.addEventListener("click", () => {
    console.log(trav);
    if (trav.pre.next == null) {
        hPrevBtn.style.display = "none";

    }
    else {
        hPrevBtn.style.display = "inline";
        trav = trav.pre;
        historyCard.setAttribute("src", `./assets/images/${trav.data}.jpg`);

    }
    if (trav.pre == null) {
        hNextBtn.style.display = "none";
    }
});


hPrevBtn.addEventListener("click", () => {
    console.log(trav);
    if (trav.next.pre == null) {
        hNextBtn.style.display = "none";
    }
    else {
        hNextBtn.style.display = "inline";
        trav = trav.next;
        historyCard.setAttribute("src", `./assets/images/${trav.data}.jpg`);
    }
    if (trav.next.next == null) {
        hPrevBtn.style.display = "none";
    }
});


reshuffleBtn.addEventListener("click", () => {
    list.clear();
    deck.shuffleDeck();
    list.push(deck.currentCard());
    activeCard.setAttribute("src", `./assets/images/${deck.currentCard()}.jpg`);
});


function displayMenu(menuName) {
    let menu = document.querySelector(`#${menuName}`);

    menu.style.display = "block"
    container.style.display = "block";

}


function closeMenu(menuName) {
    let menu = document.querySelector(`#${menuName}`);

    menu.style.display = "none";
    container.style.display = "none";
}
