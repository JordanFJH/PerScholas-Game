//Global Variables
let letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let specialChars = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "=", "+", "?", ">", "<", ".", ",", ":", ";", "[", "]", "{", "}"]
let displayedLetters = []
let roundOver = false;
let gameStatus = true;
let difficulty = -.5;
let missCount = 0;
let deleteSpeed = 0;
let iterations = 0;
let count = 0;
let points = 0;
let roundNumebr = 1;
let letterSpeed = 3;
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

console.log(highScores);
//Constantly checking the window to see if there's a miss
// const missInterval = setInterval(checkMiss, 50);


startButton.addEventListener("click", function (evt) {
    console.log("Good Luck!")
    gameStatus = true;
    gameStart();
    missInterval = setInterval(checkMiss, 30);
})



//Event listener for user click
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
    letter.classList.add("moving-down");
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
        console.log("Delete Speed: " + deleteSpeed);
        spawnInterval = setInterval(theCaller, spawnDelay);
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


function theCaller() {
    iterations++
    if (iterations < 5) {
        letterCreator();
    } else {
        clearInterval(spawnInterval);
        roundOver = true;
        setTimeout(roundContinue, 2000);
    }
}



//Adjusts the speed of each round
function adjustSpeed() {
    letterSpeed = (letterSpeed - .2).toFixed(1);
    spawnDelay = Math.floor((letterSpeed * 1000) / 3);

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
    if (missCount >= 3) {
        gameOver();
        return;
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
        missCount++;
        displayedLetters[0].remove();
        displayedLetters.shift();
    }
}

//Function to check each round and increment difficulty
function roundContinue() {
    if (gameStatus) {
        roundNumebr++;
        roundEl.innerText = roundNumebr;
        console.log("Get ready for the next round");
        adjustSpeed(); //Makes the letters and spawn delay faster
        sleep(2000); // Pauses the games between rounds
        iterations = 0;
        gameStart();
    }
    
}

//When a correct key is pressed, raise the score
function scoredPoint(key) {
    updateScore();
    updateStreak(true);
    letterRemove(key);
}

//Removes active letter that was pressed
function letterRemove(key) {
    key.remove()
    displayedLetters.shift();
}

//Selecting the random letter to be displayed from the array
function randomLetter() {
    let index;
    index = Math.floor(Math.random() * letterOptions.length);
    return letterOptions[index];
}

//Updates the score with the active streak bonus
function updateScore() {
    points += (streakNumber * 10) + 100;
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

//The game over function for when the game is over
function gameOver() {
    gameStatus = false;
    console.log("The game is over")
    clearInterval(spawnInterval);
    clearInterval(missInterval);
    for (let letter of displayedLetters) {
        letter.remove();
        console.log("Letter removed")
    }
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