const gameFeedback = document.getElementById('game-feedback');
const possibleChoices = document.querySelectorAll('.button-door');
const replayButton = document.getElementById('replay-button');
const resetButton = document.getElementById('reset-button');

const changeWinTotal = document.getElementById("changeWin");
const changeLoseTotal = document.getElementById("changeLose");
const notChangeWinTotal = document.getElementById("notchangeWin");
const notChangeLoseTotal = document.getElementById("notchangeLose");

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
let changedDoor = false;
let winningDoorID;
let nonWinningDoor;

class Stats {

    constructor(changeWin, changeLose, notchangeWin, notchangeLose) {
        this.changeWin = changeWin
        this.changeLose = changeLose
        this.notchangeWin = notchangeWin
        this.notchangeLose = notchangeLose
    }
}

createStorage()

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

replayButton.addEventListener('click', replay);
resetButton.addEventListener('click', resetStats);

function generateWinningDoor() {
    if (firstPickMade == true) {
        return;
    }
    else {
        winningDoorID = Math.floor(Math.random() * possibleChoices.length) + 1;
        // while (winningDoorID == userDoorID) {
        //     winningDoorID = Math.floor(Math.random() * possibleChoices.length) + 1;
        // }
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
    gameFeedback.innerHTML = `Thank you for chosing door ${userDoorID}. I have now revealed that door ${doorNotChosen} is not the winning door. Now that you know this, would you like to change door? Click on a door to confirm your choice`;
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
        changedDoor = true;
        checkWin();
    }
}

function disableDoors() {
    door1.disabled = true;
    door2.disabled = true;
    door3.disabled = true;
}

function checkWin() {
    if (secondPickID == winningDoorID && changedDoor == false) {
        won();
        changeStats("notchangeWin");
    }
    else if (secondPickID == winningDoorID && changedDoor == true) {
        won();
        changeStats("changeWin");
    }
    else if (secondPickID !== winningDoorID && changedDoor == false) {
        lost();
        changeStats("notchangeLose");
    }
    else if (secondPickID !== winningDoorID && changedDoor == true) {
        lost();
        changeStats("changeLose");
    }
    UpdateStats();
}

function won() {
    gameFeedback.innerHTML += ` And, you WON!`;
    document.getElementById(`door-${winningDoorID}`).style.backgroundImage = "url(./images/door-winning.jpg)";
    for (let i = 0; i < possibleChoices.length + 1; i++) 
        if (i != winningDoorID && i != doorNotChosen && i != 0) {
            nonWinningDoor = i;
        }
        document.getElementById(`door-${nonWinningDoor}`).style.backgroundImage = "url(./images/door-losing.jpg)";
}

function lost() {
    gameFeedback.innerHTML += ` And, you LOST!`;
    document.getElementById(`door-${winningDoorID}`).style.backgroundImage = "url(./images/door-winning.jpg)";
    document.getElementById(`door-${secondPickID}`).style.backgroundImage = "url(./images/door-losing.jpg)";
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

function resetStats() {
    let stat = new Stats(0, 0, 0, 0)
    localStorage.setItem("stats", JSON.stringify(stat))
    UpdateStats()
}

function changeStats(changeValue) {
    let stats = getStorage()
    if (changeValue === 'changeWin') {
        stats.changeWin++
    } else if (changeValue === 'changeLose') {
        stats.changeLose++
    } else if (changeValue === 'notchangeWin') {
        stats.notchangeWin++
    } else if (changeValue === 'notchangeLose') {
        stats.notchangeLose++
    }
    setStorage(stats);
}

function createStorage() {
    let stats = getStorage()
    if (stats.length == 0) {
        let stat = new Stats(0, 0, 0, 0)
        localStorage.setItem("stats", JSON.stringify(stat))
    }
}

function setStorage(stats) {
    localStorage.setItem("stats", JSON.stringify(stats))
}

function getStorage() {
    let stats = []
    if (localStorage.getItem("stats") !== null) {
        stats = JSON.parse(localStorage.getItem("stats"))
    }
    return stats;
}
function UpdateStats() {
    let x = getStorage().changeWin * 100 / (getStorage().changeWin + getStorage().changeLose);
    if (!isNaN(x))
        changeWinTotal.innerText = getStorage().changeWin + "  (" + x.toFixed(2) + " %)"
    else
        changeWinTotal.innerText = getStorage().changeWin + "  (" + 0 + " %)"
    x = getStorage().changeLose * 100 / (getStorage().changeWin + getStorage().changeLose);
    if (!isNaN(x))
        changeLoseTotal.innerText = getStorage().changeLose + "  (" + x.toFixed(2) + " %)"
    else
        changeLoseTotal.innerText = getStorage().changeLose + "  (" + 0 + " %)"
    x = getStorage().notchangeWin * 100 / (getStorage().notchangeWin + getStorage().notchangeLose);
    if (!isNaN(x))
        notChangeWinTotal.innerText = getStorage().notchangeWin + "  (" + x.toFixed(2) + " %)"
    else
        notChangeWinTotal.innerText = getStorage().notchangeWin + "  (" + 0 + " %)"
    x = getStorage().notchangeLose * 100 / (getStorage().notchangeWin + getStorage().notchangeLose);
    if (!isNaN(x))
        notChangeLoseTotal.innerText = getStorage().notchangeLose + "  (" + x.toFixed(2) + " %)"
    else
        notChangeLoseTotal.innerText = getStorage().notchangeLose + "  (" + 0 + " %)"
}
