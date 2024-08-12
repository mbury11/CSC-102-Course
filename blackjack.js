
var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHIT = true; //allows the player (you) to draw while yourSum <=21

window.onload = function() {
    buildDeck(); //builds your deck function
    shuffleDeck(); //shuffles your deck function
    startGame(); //start of game function for the dealer
}

function buildDeck() {
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let types = ["C","D","H","S"];
    deck = [];
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
     }
    }//console.log(deck);
}
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}
function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while (dealerSum < 17) {
        //<img>
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    for (let i =0; i > 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);  
    }
    document.getElementById("HIT").addEventListener("click", HIT);
    document.getElementById("STAY").addEventListener("click", STAY);
}

function HIT() {
    if (!canHIT) {
        return;
    }    
    let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);  

        if (reduceAce(yourSum, yourAceCount) > 21) {
            canHIT= false;
        }
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount >0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function STAY() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHIT = false;
    document.getElementById("hidden").src = ("./cards/" + hidden + ".png");

    let message = "";
    if (yourSum > 21) {
        message = "You lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You win!";
    }
    else if (yourSum < dealerSum) {
        message = "You lose!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}


function getValue(card) {
    let data = card.split("-"); //4-C -> 4 and C
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
    }
            return 10;
}
return parseInt(value);
}
function checkAce(card) {
    if (card[0] == "A") {
        return 1;
}
return 0;
}