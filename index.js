//Global Variables
let letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let displayedLetters = []
let roundOver = false;
let difficulty = -.5;
let missCount = 0;
let deleteSpeed = 0;
let iterations = 0;
let count = 0;
let points = 0;
let letterSpeed = 3;
let missInterval;
let spawnInterval;
let spawnDelay = Math.floor((letterSpeed * 1000) / 3);
const startButton = document.querySelector("button");
const scoreRef = document.querySelector("#score");
const body = document.querySelector("body");
const bounds = document.querySelector("#bounds");
let playArea = document.querySelector("#play-area")
let scoreDisplay = document.querySelector("#score-display");
const spawnArea = document.querySelector("#spawn-area");

//Constantly checking the window to see if there's a miss
// const missInterval = setInterval(checkMiss, 50);


startButton.addEventListener("click", function (evt) {
    console.log("Good Luck!")
    gameStart();
    missInterval = setInterval(checkMiss, 50);
})


const rect = bounds.getBoundingClientRect();
console.log(rect);



//Event listener for user click
window.addEventListener("keypress", function (evt) {
    if (displayedLetters.length === 0) {
        return;
    }
    let userKey = evt.key;
    let gameKey = this.document.querySelector("#spawn-area :first-child");
    console.log(gameKey.innerText);
    console.log(evt.key);
    console.log("Miss Count: " + missCount);
    if (evt.key === gameKey.innerText) {
        scoredPoint(gameKey);
    }
})


//Spawning the letter
function letterCreator() {
    let test = document.createElement("span")
    test.innerText = randomLetter();
    test.classList.add("moving-down");
    // setTimeout(() => {
    //     test.remove();
    //     displayedLetters.shift();
    // }, delaySpeed());
    test.style.animationDuration = convertingLetterSpeed(letterSpeed);
    spawnArea.appendChild(test);
    displayedLetters.push(test);
    count++;
    console.log(`Number count:  ${count}`);

}
// letterCreator();
// const interval = setInterval(letterCreator, 1000);
// clearInterval(interval);


// const interval = setInterval(theCaller, 1000)


//Function to start the entire game
function gameStart() {
    console.log("Letter speed: " + letterSpeed)
    console.log("Spawn Delay: " + spawnDelay);
    console.log("Delete Speed: " + deleteSpeed);
    spawnInterval = setInterval(theCaller, spawnDelay);



    //Used to call the letter generator and implement an iteration count on set interval
    // function theCaller() {
    //     iterations++
    //     if (iterations < 5) {
    //         letterCreator();
    //     } else {
    //         clearInterval(spawnInterval);
    //         roundOver = true;
    //         setTimeout(roundContinue, 2000);
    //     }
    // }

}

// gameStart();



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

function checkMiss() {
    //Return if there are no letters on the screen to match
    if (missCount >= 3) {
        alert("Great Job!  Let's see how you did");
    }
    if (displayedLetters.length === 0) {
        return;
    }
    let letter = displayedLetters[0];
    let rect2 = letter.getBoundingClientRect();
    let killArea = rect.top;
    if (rect2.top > killArea - 25) {
        console.log("You missed");
        missCount++;
        displayedLetters[0].remove();
        displayedLetters.shift();
    }
}

//Function to check each round and increment difficulty
function roundContinue() {
    console.log("Get ready for the next round");
    adjustSpeed(); //Makes the letters and spawn delay faster
    sleep(2000); // Pauses the games between rounds
    iterations = 0;
    gameStart();
}

//When a correct key is pressed, raise the score
function scoredPoint(key) {
    console.log("Correct key pressed")
    points += 100;
    scoreRef.innerText = points;
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

function convertingLetterSpeed(number) {
    return number + "s";
}

function convertingLetterSpeed2(number) {
    return number + "seconds";
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