const gameFeedback = document.getElementById('game-feedback');
const possibleChoices = document.querySelectorAll('.button-door');
const replayButton = document.getElementById('replay-button');

let door1 = document.getElementById('door-1');
let door2 = document.getElementById('door-2');
let door3 = document.getElementById('door-3');

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

replayButton.addEventListener('click', replay)

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
    gameFeedback.innerHTML = `Thank you for chosing door ${userDoorID}. I have now revealed that door ${doorNotChosen} is not the winning door. Now that you know this, would you like to change door?`;
    firstRevealedDoor.style.backgroundImage = "url(./images/door-losing.jpg)";
    firstRevealedDoor.disabled = true;
}

function changeOrNot() {
    disableDoors();
    if ( userSecondPick == userFirstPick){
        gameFeedback.innerHTML = `You did not change your choice.`;
        checkWin();
    } else if (userSecondPick !== userFirstPick) {
        gameFeedback.innerHTML = `You changed your choice.`;
        userFirstPickEl.classList.remove('selected');
        userSecondPickEl.classList.add('selected');
        checkWin();
    }
}

function disableDoors() {
    door1.disabled = true;
    door2.disabled = true;
    door3.disabled = true;
}

function checkWin() {
    if (secondPickID == winningDoorID) {
        gameFeedback.innerHTML += ` And, you WON!`;
        document.getElementById(`door-${winningDoorID}`).style.backgroundImage = "url(./images/door-winning.jpg)";
        for (let i = 0; i < possibleChoices.length + 1; i++) 
            if (i != winningDoorID && i != doorNotChosen && i != 0) {
                nonWinningDoor = i;
            }
            document.getElementById(`door-${nonWinningDoor}`).style.backgroundImage = "url(./images/door-losing.jpg)";
    }
    else {
        gameFeedback.innerHTML += ` And, you LOST!`;
        document.getElementById(`door-${winningDoorID}`).style.backgroundImage = "url(./images/door-winning.jpg)";
        document.getElementById(`door-${secondPickID}`).style.backgroundImage = "url(./images/door-losing.jpg)";
    }
}

function replay() {
    firstPickMade = false;
    resetDoors();
    gameFeedback.innerHTML = `Behind one of these three doors there is a prize, the two other doors do not contain a prize.
    Please click on the door that you think the prize is behind.
    For the purposes of the experiment, we assume that you never pick the winning door on the first attempt.`;
}

function resetDoors() {
    door1.disabled = false;
    door1.style.backgroundImage = "url(./images/door-closed.jpg)";
    door1.classList.remove('selected');
    door2.disabled = false;
    door2.style.backgroundImage = "url(./images/door-closed.jpg)";
    door2.classList.remove('selected');
    door3.disabled = false;
    door3.style.backgroundImage = "url(./images/door-closed.jpg)";
    door3.classList.remove('selected');
}