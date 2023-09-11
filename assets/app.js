class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}


class LinkedList {
    constructor(head = null) {
        this.head = head;
        this.length = 0;
    }

    push(data) {
        let node = new ListNode(data);
        node.next = this.head;
        this.head = node;
        this.length += 1;
        return this;
    }

    size() {
        return this.length;
    }

    clear() {
        this.head = null;
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


const deck = new CardDeck();
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
let historyBtn = document.querySelector("#historyBtn")
let hNextBtn = document.querySelector("#h-next")
let hPrevBtn = document.querySelector("#h-previous")
let backBtn = document.querySelector("#back-btn")



activeCard.setAttribute("src", `./assets/images/${deck.currentCard()}.jpg`)

nextBtn.addEventListener("click", () => {
    deck.nextCard()
    if (deck.currentIndex < deck.length) {
        console.log(list.push(deck.currentCard()))
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
    toggleVisibility(historyBtn)
    toggleVisibility(reshuffleBtn)
    toggleVisibility(hNextBtn)
    toggleVisibility(hPrevBtn)
    toggleVisibility(backBtn)
    toggleVisibility(nextBtn)
    activeCard.setAttribute("src", `./assets/images/${trav.data}.jpg`)

});

hNextBtn.addEventListener("click", () => {


});

hPrevBtn.addEventListener("click", () => {

    trav = trav.next
    activeCard.setAttribute("src", `./assets/images/${trav.data}.jpg`)
});

backBtn.addEventListener("click", () => {
    toggleVisibility(historyBtn)
    toggleVisibility(reshuffleBtn)
    toggleVisibility(hNextBtn)
    toggleVisibility(hPrevBtn)
    toggleVisibility(backBtn)
    toggleVisibility(nextBtn)
})



reshuffleBtn.addEventListener("click", () => {
    list.clear()
    deck.shuffleDeck()
    list.push(deck.currentCard())
    activeCard.setAttribute("src", `./assets/images/${deck.currentCard()}.jpg`);
});


