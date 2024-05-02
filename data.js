var User;
var money;
var Email;
var Password;

//function to update the curent cash amount counter at the top of the screen
window.onload = function() {
    const myUser = JSON.parse(localStorage.getItem("Curent_User"))
    const myJSON = JSON.parse(localStorage.getItem(myUser.email))
    var cash = myJSON.money;
    document.getElementById("cashAmount").innerHTML = "Cash: " + cash + "$";

    const UserRegistered = localStorage.getItem("Curent_User")
    if (UserRegistered == null) return
    else {
        document.getElementById("signupBtn").innerHTML = "Sign out";
        document.getElementById("signupBtn").href = "index.html";
        document.getElementById("signupBtn").onclick =
            function() {
                localStorage.removeItem("Curent_User");
            }

    }
}


// Redgister page, functions
function accountCreate() {
    Password = document.getElementById("inputPassword").value;
    var Rpassword = document.getElementById("repeatPassword").value;
    money = 0;
    if (Password != Rpassword) {
        window.alert("Password does not match")
        return
    }
    var Name = document.getElementById("inputName").value;
    Email = document.getElementById("inputEmail").value;

    const myObj = { "name": Name, "email": Email, "password": Password, "money": money };

    const myJSON = JSON.stringify(myObj);
    localStorage.setItem(Email, myJSON);
    window.alert("User registered. Proceed to login below sign up.")
}
//The login function
function accountLogin() {
    Email = document.getElementById("inputEmail").value;
    Password = document.getElementById("inputPassword").value;
    console.log(Email, Password)
    var myObj = localStorage.getItem(Email)
    const Userarray = JSON.parse(myObj);
    if (Userarray == null) {
        window.alert("Email does not match eny existing accounts");
        return
    } else {

        console.log(Userarray);

        var Email2 = Userarray.email;
        var Password2 = Userarray.password;
        console.log(Email2, Password, Password2)
    }


    if (Password != Password2) {
        window.alert("Your Password does not match, try checking your email and try again")
        return
    } else if (Password = Password2) {
        User = Userarray.name;

        const myObj = { "Curent_User": User, "email": Email2 }
        const myJSON = JSON.stringify(myObj)
        localStorage.setItem("Curent_User", myJSON)
        window.alert("You have loged in as " + User)

    } else {
        window.alert("Email does not match eny existing accounts")
    }

}
// Function to read and update the curent cash inside the database
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