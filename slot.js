var doing = false;
var spin = [new Audio("res/sounds/spin.mp3"), new Audio("res/sounds/spin.mp3"), new Audio("res/sounds/spin.mp3"), new Audio("res/sounds/spin.mp3"), new Audio("res/sounds/spin.mp3"), new Audio("res/sounds/spin.mp3"), new Audio("res/sounds/spin.mp3")];
var coin = [new Audio("res/sounds/coin.mp3"), new Audio("res/sounds/coin.mp3"), new Audio("res/sounds/coin.mp3")]
var win = new Audio("res/sounds/win.mp3");
var lose = new Audio("res/sounds/lose.mp3");
var audio = false;
let status = document.getElementById("status")
var info = true;



var cashString = document.getElementById("cashAmount").textContent; //Cash
var cash = parseInt(cashString.replace(/\D/g, "")); //Get numbers only from string (convert to int)
let inputAmount = document.getElementById("inputAmount").value;

function doSlot() {
    if (doing) {
        //  
    }
    document.getElementById("slotWonAmount").innerHTML = "Earnings: ...$";
    doing = true;
    var numChanges = randomInt(1, 4) * 7
    var numeberSlot1 = numChanges + randomInt(1, 7)
    var numeberSlot2 = numChanges + 2 * 7 + randomInt(1, 7)
    var numeberSlot3 = numChanges + 4 * 7 + randomInt(1, 7)
    var i1 = 0;
    var i2 = 0;
    var i3 = 0;
    var sound = 0
    status.innerHTML = "Spinning";
    slot1 = setInterval(spin1, 50);
    slot2 = setInterval(spin2, 50);
    slot3 = setInterval(spin3, 50);

    function spin1() {
        i1++;
        if (i1 >= numeberSlot1) {
            coin[0].play()
            clearInterval(slot1);
            return null;
        }
        slotTile = document.getElementById("slot1");
        if (slotTile.className == "a7") {
            slotTile.className = "a0";
        }
        slotTile.className = "a" + (parseInt(slotTile.className.substring(1)) + 1)
    }

    function spin2() {
        i2++;
        if (i2 >= numeberSlot2) {
            coin[1].play()
            clearInterval(slot2);
            return null;
        }
        slotTile = document.getElementById("slot2");
        if (slotTile.className == "a7") {
            slotTile.className = "a0";
        }
        slotTile.className = "a" + (parseInt(slotTile.className.substring(1)) + 1)
    }

    function spin3() {
        i3++;
        if (i3 >= numeberSlot3) {
            coin[2].play()
            clearInterval(slot3);
            winFunction();
            return null;
        }
        slotTile = document.getElementById("slot3");
        if (slotTile.className == "a7") {
            slotTile.className = "a0";
        }
        sound++;
        if (sound == spin.length) {
            sound = 0;
        }
        spin[sound].play();
        slotTile.className = "a" + (parseInt(slotTile.className.substring(1)) + 1)
    }
}

function winFunction() {
    var slot1 = document.getElementById("slot1").className;
    var slot2 = document.getElementById("slot2").className;
    var slot3 = document.getElementById("slot3").className;
    const User = JSON.parse(localStorage.getItem('Curent_User'));
    const profile = JSON.parse(localStorage.getItem(User.email));

    if ((slot1 === slot2 && slot2 === slot3) && (slot1 !== "a7")) {
        status.innerHTML = "YOU WIN! (50x)";

        let inputAmount = document.getElementById("inputAmount").value;
        document.getElementById("slotWonAmount").innerHTML = "Earnings: " + inputAmount * 50 + "$";

        reward = inputAmount * 50; // Reward amount for green
        intReward = parseInt(reward); //Convert to int
        cash = cash - inputAmount; // Balance fix
        cash = cash + intReward; // Balance + reward amount


        profile.money = profile.money + intReward;

        document.getElementById("cashAmount").innerHTML = profile.money + "$" // Show monet after spin
        localStorage.setItem(User.email, JSON.stringify(profile));
        win.play();

    } else {
        status.innerHTML = "YOU LOSE! (0x)"
        let inputAmount = document.getElementById("inputAmount").value;
        document.getElementById("slotWonAmount").innerHTML = "Earnings: " + 0 + "$";

        reward = inputAmount * 50; // Reward amount for green
        intReward = parseInt(reward); //Convert to int
        cash = cash - inputAmount; // Balance fix
        cash = cash + intReward; // Balance + reward amount

        profile.money = profile.money - inputAmount;

        document.getElementById("cashAmount").innerHTML = profile.money + "$"; // Show monet after spin
        localStorage.setItem(User.email, JSON.stringify(profile));
        lose.play();
    }
    doing = false;


}

function randomInt(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}