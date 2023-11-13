//Global Variables
let letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let specialChars = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "=", "+", "?", ">", "<", ".", ",", ":", ";", "[", "]", "{", "}"]
let displayedLetters = []
let roundOver = false;
let gameStatus = true;
let difficulty = -.5;
let missCount;
let missDelay = 30;
let deleteSpeed = 0;
let iterations;
let count = 0;
let points;
let roundNumber;
let letterSpeed;
let missInterval;
let spawnInterval;
let spawnDelay = Math.floor((letterSpeed * 1000) / 3);
let streakNumber = 0;
const highScores = document.querySelectorAll("#high-scores-container span");
const roundEl = document.querySelector("#round-holder h4");
const streakNumberEl = document.querySelector("#streak-number");
const startButton = document.querySelector("button");
const scoreRef = document.querySelector("#score");
const body = document.querySelector("body");
const bounds = document.querySelector("#bounds");
let playArea = document.querySelector("#play-area")
let scoreDisplay = document.querySelector("#score-display");
const spawnArea = document.querySelector("#spawn-area");

//Constantly checking the window to see if there's a miss
// const missInterval = setInterval(checkMiss, 50);


//start button to start the game
startButton.addEventListener("click", function (evt) {
    gameInitialize();
    gameStart();
    
})



//Event listener for player pressing the key and matching it to the correct letter
window.addEventListener("keypress", function (evt) {
    if (displayedLetters.length === 0) {
        return;
    }
    let userKey = evt.key;
    let gameKey = this.document.querySelector("#spawn-area :first-child");
    if (evt.key === gameKey.innerText) {
        scoredPoint(gameKey);
    } else {
        updateStreak(false);
    }
})


//Spawning the letter
function letterCreator() {
    let letter = document.createElement("span")
    letter.innerText = randomLetter();
    if (roundNumber <= 6) { //Adds seperate class of moving side to increase difficulty after certain round
        letter.classList.add("moving-down")
    } else if (roundNumber <= 9){
        let randNum = Math.round(Math.random());
        randNum == 1 ? letter.classList.add("moving-down") : letter.classList.add("moving-down-2");
    } else {
        let randNum = Math.round(Math.random());
        randNum == 1 ? letter.classList.add("moving-down-3") : letter.classList.add("moving-down-2");
    }
    letter.style.animationDuration = convertingLetterSpeed(letterSpeed);
    spawnArea.appendChild(letter);
    displayedLetters.push(letter);
    count++;
    console.log(`Number count:  ${count}`);

}
// letterCreator();
// const interval = setInterval(letterCreator, 1000);
// clearInterval(interval);


// const interval = setInterval(theCaller, 1000)


//Function to start the entire game
function gameStart() {
    if (gameStatus){
        console.log("Letter speed: " + letterSpeed)
        console.log("Spawn Delay: " + spawnDelay);
        spawnInterval = setInterval(theCaller, spawnDelay);
        console.log("Miss interval started")
    } else {
        console.log("Game ended, can't start");
    }
    
}



/*
********************************************
* 
*FUNCTIONS
*
********************************************
*/
// let time = new Date().getTime();
// console.log(time);

// console.log("Hello World")
// sleep(2000);
// console.log("Adios")


// Controls the iterations of number of letters displayed each roound
function theCaller() {
    iterations++
    if (iterations < 5) {
        letterCreator();
    } else {
        clearInterval(spawnInterval);
        roundOver = true;
        setTimeout(roundContinue, 2100);
    }
}



//Adjusts the speed of each round
function adjustSpeed() {
    letterSpeed = (letterSpeed - .1).toFixed(1);
    spawnDelay = Math.floor((letterSpeed * 1000) / 4);

}


// function to "pause" the program for given amount of time for better flow of game
function sleep(miliseconds) {
    let currenTime = new Date().getTime();
    while (currenTime + miliseconds >= new Date().getTime()) {

    }
}

//Delay speed for set timeout in Letter Creator - Determines when it's deleted
// Might need to change it to 1/3 or 2/3 of letter speed
// Might be obsolete with the killzone active
function delaySpeed() {
    deleteSpeed = letterSpeed;
    if (letterSpeed - .2 <= 0) {
        return deleteSpeed;
    } else {
        deleteSpeed = (letterSpeed - .2) * 1000;
        return deleteSpeed;
    }
}

//Checks if a letter reaches the killzone and counts it as a miss
function checkMiss() {
    //Ends game if 3 misses
    if (!gameStatus){
        console.log("game not started");
        return;
    }
    if (missCount == 3) {
        clearInterval(missInterval);
        console.log("Miss interval cleared");
        gameOver();
    }
    //Return if there are no letters on the screen to match
    if (displayedLetters.length === 0) {
        return;
    }
    const rect = bounds.getBoundingClientRect();
    let letter = displayedLetters[0];
    let rect2 = letter.getBoundingClientRect();
    let killArea = rect.top;
    if (rect2.top > killArea - 25) {
        console.log("You missed");
        updateStreak(false);
        loseLife();
        missCount++;
        displayedLetters[0].remove();
        displayedLetters.shift();
    }
}

//Deletes a visual of the life when the player doesn't hit a letter in time
function loseLife() {
    let lastLife = document.querySelector("#bounds :last-child");
    lastLife.classList.add("vaporize");
    setTimeout(function () {
        lastLife.remove();
    }, 151)
}

//Creates the visuals for the 3 lives during game initialize
function makeLives() {
    for (let i = 0; i < 3; i++) {
        let life = document.createElement("div")
        bounds.appendChild(life);
    }
}

//Function to check each round and increment difficulty
function roundContinue() {
    if (gameStatus) {
        roundNumber++;
        roundEl.innerText = roundNumber;
        console.log("Get ready for the next round");
        adjustSpeed(); //Makes the letters and spawn delay faster
        sleep(1500); // Pauses the games between rounds
        playNextlevel();
        iterations = 0;
        roundAnimate();
        gameStart();
    }
    
}

function roundAnimate () {
    roundEl.style.animationPlayState = "running";
    setTimeout(function () {
        roundEl.style.animationPlayState = "paused";
    }, 800)
}

//When a correct key is pressed, raise the score
function scoredPoint(key) {
    const rect = bounds.getBoundingClientRect();
    let letter = displayedLetters[0];
    let rect2 = letter.getBoundingClientRect();

    let scoringPoints = Math.floor((Math.round(rect.top - rect2.top) / 2));
    
    playExplosion();
    updateScore(scoringPoints);
    updateStreak(true);
    letterRemove(key);
}

//Plays explosion sound effect for guessing the correct letter
function playExplosion () {
    let audio = new Audio("../Resources/Audio/Retro_Explosionn.wav")
    audio.play();
}

//Plays next level sound for player making it to the next level
function playNextlevel() {
    let audio = new Audio("../Resources/Audio/Next_level.wav");
    audio.play();
}

//Removes active letter that was pressed
function letterRemove(key) {
    let linger = key.getBoundingClientRect();
    console.log(linger.top);
    key.remove();
    displayedLetters.shift();
    // key.style.animationDuration = "100ms";
    // key.classList.remove("moving-down")
    // key.classList.remove("moving-down-2")
    // key.classList.add("explode")
    // setTimeout(function () {
    //     key.remove()
    //     displayedLetters.shift();
    // }, 100)
    
}

//Selecting the random letter to be displayed for the player to press
function randomLetter() {
    let pickedChar;
    let chosenChar;
    let index;
    let randomNum = Math.round(Math.random());
    if (roundNumber <= 3) {
        index = Math.floor(Math.random() * letterOptions.length);
        pickedChar = letterOptions[index];
        chosenChar = pickedChar
    } else if (roundNumber >= 4){ //Adds capital letters after round 3
        index = Math.floor(Math.random() * letterOptions.length);
        pickedChar = letterOptions[index];
        randomNum === 1 ? chosenChar = pickedChar : chosenChar = pickedChar.toUpperCase();
    }
    return chosenChar;
}

//Updates the score with the active streak bonus
function updateScore(pointstoAdd) {
    points += (streakNumber * 10) + pointstoAdd;
    scoreRef.innerText = points;
}


//Updates the active streak number depending on if player hits, misses, or gusess wrong letter
function updateStreak (bool) {
    bool === true ? streakNumber++ : streakNumber = 0;
    streakNumberEl.innerText = streakNumber;
}

function convertingLetterSpeed(number) {
    return number + "s";
}

function convertingLetterSpeed2(number) {
    return number + "seconds";
}

//Updates the highscores in a sorting order
function updateHighScores(userPoints) {
    let lowest;
    let newLow = userPoints;
    for (let i = 0; i < highScores.length; i++){
        if (newLow > highScores[i].innerText){
            lowest = highScores[i].innerText;
            highScores[i].innerText = newLow;
            newLow = lowest;
        }
    }
}

function gameInitialize(){
    missInterval = setInterval(checkMiss, missDelay);
    console.log("Good Luck!")
    makeLives();
    roundNumber = 1;
    roundEl.innerText = roundNumber;
    iterations = 0;
    points = 0;
    scoreRef.innerText = 0;
    missCount = 0;
    letterSpeed = 3;
    spawnDelay = Math.floor((letterSpeed * 1000) / 3);
    gameStatus = true;
}


//The game over function for when the game is over
function gameOver() {
    gameStatus = false;
    console.log("The game is over")
    console.log(displayedLetters)
    //first wave of deleting all the letters, combined with another for loop, working for now
    for (let i = 0; i < displayedLetters.length; i++){
        displayedLetters[0].remove();
        displayedLetters.shift();
        console.log("Letter removed")
    }
    //Second wave of deleting the remaining letters from the screen
    for (let letter of displayedLetters) { 
        displayedLetters.pop();
        letter.remove();
        console.log("Letter removed")
    }
    console.log(displayedLetters)
    clearInterval(spawnInterval);
    updateHighScores(points)
}



//TRASH



// class Letter {
//     constructor(letter) {
//         this.letter = randomLetter();
//     }
//     move() {
//         spot += .2;
//         spotter = spot + "%";
//         this.style.top = spotter;
//         if (spot < 100) {
//             requestAnimationFrame(move);
//         }
//         else {
//             thing.remove();
//         }
//     }
// }






//request Animation Frame method of animating the letters

// function letterMove(timeStamp){
//     let thing = spawnArea.children[0];
//     spot += .2;
//     spotter = spot + "%";
//     thing.style.top = spotter;
//     if (spot < 100) {
//         requestAnimationFrame(letterMove);
//     }
//     else {
//         thing.remove();
//     }

// }
// requestAnimationFrame(letterMove);



// function roundContinue() {
//     let answer = prompt("Would you like to coninue?").toLowerCase();
//     if (answer === "y"){
//         iterations = 0;
//         letterSpeed += difficulty;
//         spawnDelay += (difficulty * 200);
//         console.log("Current difficulty is " + difficulty);
//         daGame();
//     }else {
//         return;
//     }
// }





//Need to have every letter move down in intervals that get gradually faster
//The letters are going to be in an array
//Set interval for position
//Looping for positon of the element
//Display none for the position