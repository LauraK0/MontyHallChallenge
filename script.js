const gameFeedback = document.getElementById('game-feedback');
const possibleChoices = document.querySelectorAll('.button-door');
const replayButton = document.getElementById('replay-button');
const resetButton = document.getElementById('reset-button');
const simulateButton = document.getElementById('simulate-button');

const totalSwitchEl = document.querySelector('#stats #switches .total')
const switchBar = document.querySelector('#stats #switches .bar');
const switchWinRateEl = document.querySelector('#stats #switches .bar .win-rate')

const totalStayEl = document.querySelector('#stats #stays .total')
const stayBar = document.querySelector('#stats #stays .bar');
const stayWinRateEl = document.querySelector('#stats #stays .bar .win-rate')

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
let simDelay;

class Stats {

    constructor(totalSwitchPlays, totalStayPlays, totalSwitchWins, totalStayWins) {
        this.totalSwitchPlays = totalSwitchPlays
        this.totalStayPlays =  totalStayPlays
        this.totalSwitchWins = totalSwitchWins
        this.totalStayWins = totalStayWins
    }
}

createStorage();
updateStats();

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
simulateButton.addEventListener('click', simulate);

function generateWinningDoor() {
    if (firstPickMade == true) {
        return;
    }
    else {
        winningDoorID = Math.floor(Math.random() * possibleChoices.length) + 1;
        for (let i = 0; i < possibleChoices.length + 1; i++) 
            if (i != winningDoorID && i != userDoorID && i != 0) {
                doorNotChosen = i;
            }
        firstPickMade = true;
        showEmptyDoor(doorNotChosen);
    }
}

function showEmptyDoor(doorNotChosen) {
    let firstRevealedDoor = document.getElementById(`door-${doorNotChosen}`);
    gameFeedback.innerHTML = `Thank you for chosing door ${userDoorID}. I have now revealed that door ${doorNotChosen} is not the winning door. Now that you know this, would you like to change door? Click on a door to confirm your choice`;
    firstRevealedDoor.style.backgroundImage = "url(./images/door-losing.jpg)";
    firstRevealedDoor.disabled = true;
}

function changeOrNot() {
    disableDoors();
    console.log(userSecondPick)
    if ( userSecondPick == userFirstPick){
        gameFeedback.innerHTML = `You did not change your choice.`;
        checkWin();
    } else if (userSecondPick !== userFirstPick) {
        gameFeedback.innerHTML = `You changed your choice.`;
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
    changedDoor = false;
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
    updateStats()
}

function changeStats(changeValue) {
    let stats = getStorage()
    if (changeValue === 'changeWin') {
        stats.totalSwitchPlays++
        stats.totalSwitchWins++
    } else if (changeValue === 'changeLose') {
        stats.totalSwitchPlays++
    } else if (changeValue === 'notchangeWin') {
        stats.totalStayWins++
        stats.totalStayPlays++
    } else if (changeValue === 'notchangeLose') {
        stats.totalStayPlays++
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
    updateStats();
}

function getStorage() {
    let stats = []
    if (localStorage.getItem("stats") !== null) {
        stats = JSON.parse(localStorage.getItem("stats"))
    }
    return stats;
}

function updateStats() {
    let stats = getStorage();
    const switchWinRate = (stats.totalSwitchWins == 0) ? (0 + '%') : (((stats.totalSwitchWins /stats.totalSwitchPlays) *100).toFixed(1) + '%');
    switchBar.style.width = switchWinRate; 
    totalSwitchEl.innerHTML = stats.totalSwitchPlays;
    switchWinRateEl.innerHTML = switchWinRate;
    const stayWinRate = (stats.totalStayWins == 0) ? (0 + '%') :  ((stats.totalStayWins /stats.totalStayPlays) *100).toFixed(1) + '%';
    stayBar.style.width = stayWinRate; 
    totalStayEl.innerHTML = stats.totalStayPlays;
    stayWinRateEl.innerHTML = stayWinRate;
}

function repeat(func, times) {
    func();
    times && --times && repeat(func, times);
}

function simulate() {
    let speed = document.getElementById("simulation-speed").value;

    if (speed == "x1") {
         document.getElementById("game-feedback").value = "Wait for 3 seconds to get things ready!";
         speed = 1000;
     }
     else if (speed == "x2") {
         document.getElementById("game-feedback").value = "Wait for 1 second to get things ready!";
         speed = 500;
     }
    else if (speed == "x1000") {
        document.getElementById("game-feedback").value = "Wait for 0.001 seconds to get things ready!";
        speed = 1;
    }

    let runTime = parseInt(document.getElementById("simulation-length").value)
    
    repeat(function () {
        replay();
        let userFirstPick = Math.floor(Math.random() * possibleChoices.length) + 1;
        console.log(userFirstPick)
        let ifChange = document.getElementById("change-or-not").value;
        generateWinningDoor(userFirstPick);
        console.log(winningDoorID)
        for (let i = 0; i < possibleChoices.length + 1; i++) 
            if (i != winningDoorID && i != userDoorID && i != 0) {
            doorNotChosen = i;
        }
        showEmptyDoor(doorNotChosen);
        console.log(doorNotChosen)
        if ( ifChange == 'Yes') {
            let arr = [1,2,3];
            userSecondPick = Math.floor(Math.random() * arr.length) + 1;
            for (let i = 0; i < arr.length + 1; i++) 
             if (i != userFirstPick && i != 0 && i != doorNotChosen) {
                userSecondPick = i;
            }
            secondPickID = userSecondPick;
            console.log(userSecondPick)
            gameFeedback.innerHTML = `You changed your choice.`;
            changedDoor = true;
        } else {
            userSecondPick = userFirstPick;
            secondPickID = userSecondPick;
            gameFeedback.innerHTML = `You did not change your choice.`;
        }
    checkWin();
     }, runTime);
}