var dealerCardSum = 0;
var playerCardSum = 0;
var dealerAceCount = 0;
var PlayerAceCount = 0;
var bet = 0;
var account = 0;
var gameon = false;
var hidden;
const deck = [];

var User;
var money;
var Email;
var Password;


var canHit = true; //allows the player (you) to draw while PlayerSum <= 21
window.onload = function() {
    const myUser = JSON.parse(localStorage.getItem("Curent_User"))
    const tester = JSON.parse(localStorage.getItem(myUser.email))
    var cash = tester.money;
    document.getElementById("cashAmount").innerHTML = "Cash: " + cash + "$";

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);

    document.getElementById("B50").addEventListener("click", bet50)
    document.getElementById("B100").addEventListener("click", bet100)
    document.getElementById("B250").addEventListener("click", bet250)
    document.getElementById("B500").addEventListener("click", bet500)
    document.getElementById("B1K").addEventListener("click", bet1000)

    User = myUser.email;
    const myJSON = JSON.parse(localStorage.getItem(User));
    account = myJSON.money;

    const UserRegistered = localStorage.getItem("Curent_User")
    if (UserRegistered == null) return
    else {
        document.getElementById("signupBtn").innerHTML = "Sign out";
        document.getElementById("signupBtn").href = "index.html";
        document.getElementById("signupBtn").onclick = function() {
            localStorage.removeItem("Curent_User");
        }

    }
}

function Restart() {
    if (gameon == true) {
        location.reload();
    }
    document.getElementById("placeholdercard").style.display = "none";
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    for (g = 0; g < 30; g++) {
        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
            }
        }
    }
    // console.log(deck);
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
    document.getElementById("restart").innerHTML = "Restart"
    document.getElementById("Bettamount").innerHTML = "";
    hidden = deck.pop();
    dealerCardSum += getValue(hidden);
    dealerAceCount += tryAce(hidden);

    let cardImg = document.createElement("img", );
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerCardSum += getValue(card);
    dealerAceCount += tryAce(card);
    document.getElementById("dealer-hand").append(cardImg);

    //console.log(dealerCardSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerCardSum += getValue(card);
        PlayerAceCount += tryAce(card);
        document.getElementById("player-hand").append(cardImg);
    }

    //console.log(playerCardSum);
    document.getElementById("player-sum").innerHTML = playerCardSum;
    gameon = true;

}

function bet50() {
    if (gameon == true) {
        return;
    }
    if (account < 50) {
        return;
    }
    account = account - 50;
    bet += 50;
    var bet2 = bet;
    document.getElementById("Bettamount").innerHTML = "Bet amount: " + bet2.toString() + "$";
    document.getElementById("cashAmount").innerHTML = "Cash: " + account + "$";

}

function bet100() {
    if (gameon == true) {
        return;
    }
    if (account < 100) {
        return;
    }
    account = account - 100;
    bet += 100;
    var bet2 = bet;
    document.getElementById("Bettamount").innerHTML = "Bet amount: " + bet2.toString() + "$";
    document.getElementById("cashAmount").innerHTML = "Cash: " + account + "$";
}

function bet250() {
    if (gameon == true) {
        return;
    }
    if (account < 250) {
        return;
    }
    account = account - 250;
    bet += 250;
    var bet2 = bet;
    document.getElementById("Bettamount").innerHTML = "Bet amount: " + bet2.toString() + "$";
    document.getElementById("cashAmount").innerHTML = "Cash: " + account + "$";
}

function bet500() {
    if (gameon == true) {
        return;
    }
    if (account < 500) {
        return;
    }
    account = account - 500;
    bet += 500;
    var bet2 = bet;
    document.getElementById("Bettamount").innerHTML = "Bet amount: " + bet2.toString() + "$";
    document.getElementById("cashAmount").innerHTML = "Cash: " + account + "$";
}

function bet1000() {
    if (gameon == true) {
        return;
    }
    if (account < 100) {
        return;
    }
    account = account - 1000;
    bet += 1000;
    var bet2 = bet;
    document.getElementById("Bettamount").innerHTML = "Bet amount: " + bet2.toString() + "$";
    document.getElementById("cashAmount").innerHTML = "Cash: " + account + "$";
}

function hit() {
    if (!canHit) {
        return;
    }
    ifAce(playerCardSum, PlayerAceCount)

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerCardSum += getValue(card);
    PlayerAceCount += tryAce(card);
    document.getElementById("player-hand").append(cardImg);

    document.getElementById("player-sum").innerHTML = playerCardSum;
    if (playerCardSum > 21) {
        stand();
        return;
    }
}

let won

function stand() {
    dealerCardSum = ifAce(dealerCardSum, dealerAceCount);
    playerCardSum = ifAce(playerCardSum, PlayerAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    while (dealerCardSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerCardSum += getValue(card);
        dealerAceCount += ifAce(card);
        document.getElementById("dealer-hand").append(cardImg);
    }
    //console.log(dealerCardSum);

    let returntext = "";
    if (playerCardSum > 21) {
        returntext = "You Lose!";
        bet = 0

    } else if (dealerCardSum > 21) {
        returntext = "You won!";
        bet = bet * 2;
        account = account + bet;
        const userwin = JSON.parse(localStorage.getItem("Curent_User"));
        const user = JSON.parse(localStorage.getItem(userwin.email));
        user.money = user.money + bet;
        localStorage.setItem(user.email, JSON.stringify(user));
    }
    //both you and dealer <= 21
    else if (playerCardSum == dealerCardSum) {
        returntext = "Draw!";
        bet = bet;
        account = account + bet;
        bet = 0;
    } else if (playerCardSum > dealerCardSum) {
        returntext = "You Won! 🎉";
        bet = bet * 2
        account = account + bet;
        const userwin = JSON.parse(localStorage.getItem("Curent_User"));
        const user = JSON.parse(localStorage.getItem(userwin.email));
        user.money = user.money + bet;
        localStorage.setItem(user.email, JSON.stringify(user));
    } else if (playerCardSum < dealerCardSum) {
        returntext = "You Lost!";
        bet = 0;
    }

    document.getElementById("dealer-sum").innerHTML = dealerCardSum;
    document.getElementById("player-sum").innerHTML = playerCardSum;
    document.getElementById("BigName").innerHTML = returntext;
    document.getElementById("wonAmount").innerHTML = "Earnings: " + bet / 2 + "$";
    document.getElementById("cashAmount").innerHTML = "Cash: " + account + "$";
    bet = 0;
}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function tryAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function ifAce(PlayerSum, PlayerAceCount) {
    while (PlayerSum > 21 && PlayerAceCount > 0) {
        PlayerSum -= 10;
        PlayerAceCount -= 1;
    }
    return PlayerSum;
}

function clearDeck(deck) {
    deck.remove
}


//The data becuse otherwise it whont work;)
function updatecash() {
    const myJSON = JSON.parse(localStorage.getItem("Curent_User"))
    const myUser = JSON.parse(localStorage.getItem(myJSON.email))
    var cash = myUser.money;
    var webmoney = document.getElementById("cashAmount").innerHTML;
    webmoney = parseInt(webmoney.replace(/[^0-9]/g, ''));

    if (webmoney == null) {
        return cash = 0;
    }

    cash = +webmoney;
    document.getElementById("cashAmount").innerHTML = "Cash: " + cash + "$";
    myUser.money = cash;
    const obj = JSON.stringify(myUser);

    localStorage.setItem(myJSON.email, obj);
}

function addCash() {
    var moneyAdd = parseInt(document.getElementById("moneyAdd").value);
    const myObj = JSON.parse(localStorage.getItem("Curent_User"));
    User = myObj.email;
    console.log(myObj, User)
    const profile = JSON.parse(localStorage.getItem(User))
    var Curent_cash = profile.money;
    Curent_cash = Curent_cash + moneyAdd;
    console.log(profile, Curent_cash)
    profile.money = Curent_cash;
    localStorage.setItem(User, JSON.stringify(profile))
}