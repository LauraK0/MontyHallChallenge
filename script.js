const gameFeedback = document.getElementById('game-feedback');
const possibleChoices = document.querySelectorAll('.button-door');


let userChoice;
let winningDoor;

let isFirstChoice;
let isSecondChoice;
let firstOpenedDoor;
let firsChosenDoor;
let secondChosenDoor;
let simulating = false

let firstOpenedDoors = [];

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    console.log(userChoice)
    gameStart(userChoice);
}))

function gameStart(userChoice) {
    let doorID = userChoice.charAt(userChoice.length - 1); 
    console.log(doorID);
    let randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1;
    console.log(randomNumber);
    while (randomNumber == doorID) {
        randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1;
      }
     if (doorID !== randomNumber) {
        gameFeedback.innerHTML = 'You did not pick the winning door. Before I open your door, I will allow you to change your chosen door. Please select your chosen door';
        showEmptyDoor(userChoice);
    } else {

    }
    // isFirstChoice = true;
    // isSecondChoice = false;
    // document.getElementById("winlosetext").value = "";
    // document.getElementById("change_or_not_ask").value = "Behind one of these doors there is a car. Behind each of the other two doors there is a goat. Click on the door that you think the car is behind.";
    // UpdateStats()
}

function showEmptyDoor(userChoice) {
    firstOpenedDoor = document.getElementById(userChoice);
    firstOpenedDoor.style.backgroundImage = "url(./images/door-losing.jpg)";
    changeOrNot();
}

function changeOrNot() {
//  const remainingChoices = 
}
 
// function FirstChoice(door) {
//     let a = [1,2,3]
//     let x;
//     let y;
//     let z;
//     if (door == "door1") {
//         if (winningDoor == 1) {
//             firstOpenedDoor = "door3"
//             x = 3
//         }
//         else {
//             if (winningDoor == 2) {
//                 firstOpenedDoor = "door3"
//                 x = 3
//             }
//             else {
//                 firstOpenedDoor = "door2"
//                 x = 2
//             }
//         }
//         y = 1
//     }
//     if (door == "door2") {
//         if (winningDoor == 2) {
//             firstOpenedDoor = "door1"
//             x = 1
//         }
//         else {
//             if (winningDoor == 1) {
//                 firstOpenedDoor = "door3"
//                 x =3
//             }
//             else {
//                 firstOpenedDoor = "door1"
//                 x = 1
//             }
//         }
//         y = 2
//     }
//     if (door == "door3") {
//         if (winningDoor == 3) {
//             firstOpenedDoor = "door2"
//             x =2
//         }
//         else {
//             if (winningDoor == 1) {
//                 firstOpenedDoor = "door2"
//                 x = 2
//             }
//             else {
//                 firstOpenedDoor = "door1"
//                 x = 1
//             }
//         }
//         y =3
//     }
//     Hide(firstOpenedDoor);
//     a.splice(a.indexOf(x), 1);
//     a.splice(a.indexOf(y), 1);
//     document.getElementById("change_or_not_ask").value = "Obviously the car is not behind door " + x + ". But before I open door " + y +", the door you selected, I'm going to let you switch to door " + a +" if you like. Again, click on the door which you think the car is behind.";
//     return door;
// }

function Hide(id) {
    let x = "door" + winningD
    if (id == x) {
        document.getElementById(id).src = "Photos/car.png";
    }
    else {
        document.getElementById(id).src = "Photos/goat.png";
    }
}

function Show(id) {
    document.getElementById(id).src = "Photos/door.png";
}

function Replay() {
    CreateGame()
}