const gameFeedback = document.getElementById('game-feedback');
const possibleChoices = document.querySelectorAll('.button-door');

let userFirstPick;
let userFirstPickEl;
let userDoorID;
let doorNotChosen;
let firstPickMade = false;
let userSecondPick;
let userSecondPickEl;
let secondPickID
let winningDoorID;
let nonWinningDoor;

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    if (firstPickMade == false) {
        userFirstPick = e.target.id;
        userFirstPickEl = document.getElementById(e.target.id);
        userFirstPickEl.classList.add('selected');
        userDoorID = userFirstPick.charAt(userFirstPick.length - 1);
        generateWinningDoor();
        e.preventDefault();
    }
    else {
        userSecondPick = e.target.id;
        userSecondPickEl = document.getElementById(e.target.id);
        secondPickID = userSecondPick.charAt(userSecondPick.length - 1);
        changeOrNot();
        e.preventDefault();
    }
}));


function generateWinningDoor() {
    if (firstPickMade == true) {
        return;
    }
    else {
        winningDoorID = Math.floor(Math.random() * possibleChoices.length) + 1;
        while (winningDoorID == userDoorID) {
            winningDoorID = Math.floor(Math.random() * possibleChoices.length) + 1;
        }
        for (let i = 0; i < possibleChoices.length + 1; i++) 
            if (i != winningDoorID && i != userDoorID && i != 0) {
                doorNotChosen = i;
            }
        firstPickMade = true;
        showEmptyDoor(doorNotChosen);
    }
}

function showEmptyDoor(doorNotChosen) {
    userDoorID = userFirstPick.charAt(userFirstPick.length - 1); 
    let firstRevealedDoor = document.getElementById(`door-${doorNotChosen}`);
    gameFeedback.innerHTML = `Thank for chosing door ${userDoorID}. I have now revealed that door ${doorNotChosen} is not the winning door. Now that you know this, would you like to change door?`;
    firstRevealedDoor.style.backgroundImage = "url(./images/door-losing.jpg)";
    firstRevealedDoor.disabled = true;
}

function changeOrNot() {
    disableDoors();
    if ( userSecondPick == userFirstPick){
        checkWin();
    } else if (userSecondPick !== userFirstPick) {
        userFirstPickEl.classList.remove('selected');
        userSecondPickEl.classList.add('selected');
        checkWin();
    }
}

function disableDoors() {
    let door1 = document.getElementById('door-1');
    door1.disabled = true;
    let door2 = document.getElementById('door-2');
    door2.disabled = true;
    let door3 = document.getElementById('door-3');
    door3.disabled = true;
}

function checkWin() {
    if (secondPickID == winningDoorID) {
        console.log('won');
        document.getElementById(`door-${winningDoorID}`).style.backgroundImage = "url(./images/door-winning.jpg)";
        for (let i = 0; i < possibleChoices.length + 1; i++) 
            if (i != winningDoorID && i != doorNotChosen && i != 0) {
                nonWinningDoor = i;
            }
            document.getElementById(`door-${nonWinningDoor}`).style.backgroundImage = "url(./images/door-losing.jpg)";
    }
    else {
        console.log('lost');
        document.getElementById(`door-${winningDoorID}`).style.backgroundImage = "url(./images/door-winning.jpg)";
        document.getElementById(`door-${secondPickID}`).style.backgroundImage = "url(./images/door-losing.jpg)";
    }
}

function Replay() {
    CreateGame()
}

