// Node Class
class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.pre = null;
    }
}

// LinkedList Class
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

// CardDeck Class 
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

let activeCard = document.querySelector("#active-card");
let nextBtn = document.querySelector("#next-btn")
let reshuffleBtn = document.querySelector("#reshuffle")

let historyBtn = document.querySelector("#history-btn")
let historyCard = document.querySelector("#history-active-card")
let hPrevBtn = document.querySelector("#history-prev-btn")
let hNextBtn = document.querySelector("#history-next-btn")

let container = document.querySelector(".container");

let alertContainer = document.querySelector("#alert-container")

// Initialize a new deck of cards
const deck = new CardDeck();

// Initialize a new list to store cards previously shown
const list = new LinkedList();

// Set a trav variable to null; Keeps track of current location as we browse the linked list.
let trav = null;

// Starts the game
startGame();

//  Displays the next card in the deck
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

// Displays the history menu
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

// Gives functionality to the next button in the history menu
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

// Gives functionality to the previous button in the history menu
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
    if (trav.next == null) {
        hPrevBtn.style.display = "none";
    }
});


// Starts a new game
function startGame() {
    // Shuffle the deck at the start
    deck.shuffleDeck()

    // Add the first card to the list
    list.push(deck.currentCard())

    // Display the first card on the deck
    activeCard.setAttribute("src", `./assets/images/${deck.currentCard()}.jpg`)
}

// Toggles visibility of an element
function toggleVisibility(element) {

    if (element.style.display == "none") {
        element.style.display = "inline"
    }
    else {
        element.style.display = "none"
    }
}

// Displays a specific menu
function displayMenu(menuName) {
    let menu = document.querySelector(`#${menuName}`);

    menu.style.display = "block"
    container.style.display = "block";
}


// Closes the menu
function closeMenu(menuName) {
    let menu = document.querySelector(`#${menuName}`);

    menu.style.display = "none";
    container.style.display = "none";
}

function displayAlert() {
    alertContainer.style.display = "block";
}

function closeAlert() {
    alertContainer.style.display = "none";
}

function reshuffle() {
    list.clear();
    startGame();
    closeAlert()
}