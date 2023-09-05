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

const deck = new CardDeck();

deck.shuffleDeck()

let activeCard = document.querySelector("#active-card");
let nextBtn = document.querySelector("#next-btn")
let reshuffleBtn = document.querySelector("#reshuffle")

activeCard.setAttribute("src", `./assets/images/${deck.currentCard()}.jpg`)

nextBtn.addEventListener("click", () => {
    deck.nextCard()
    if (deck.currentIndex < deck.length) {

        activeCard.setAttribute("src", `./assets/images/${deck.currentCard()}.jpg`);
        console.log(deck.currentIndex);
    }
    else {
        console.log("End of the Deck");
    }
});

reshuffleBtn.addEventListener("click", () => {
    deck.shuffleDeck()
    activeCard.setAttribute("src", `./assets/images/${deck.currentCard()}.jpg`);
});


