//Global Variables
let letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let displayedLetters = []
let roundOver = false;
let difficulty = -.5;
let spawnDelay = 1000;
let missCount = 0;
let deleteSpeed = 0;
let iterations = 0;
let count = 0;
let score = 0;
let letterSpeed = 3;
const body = document.querySelector("body");
let playArea = document.querySelector("#play-area")
let scoreDisplay = document.querySelector("#score-display");
const spawnArea = document.querySelector("#spawn-area");


// setInterval(checkMiss, 500);

window.addEventListener("focus", function (evt){
    missCount++;
    console.log(missCount);
})



//Event listener for user click
window.addEventListener("keypress", function (evt){
    let userKey = evt.key;
    let gameKey = this.document.querySelector("#spawn-area :first-child");
    console.log(gameKey.innerText);
    console.log(evt.key);
    console.log("Miss Count: " + missCount);
    if (evt.key === gameKey.innerText){
        console.log("This is the correct letter");
        letterRemove(gameKey);
    }
})


//Spawning the letter
function letterCreator() {
    let test = document.createElement("span")
    test.innerText = randomLetter();
    test.classList.add("moving-down");
    setTimeout(() => {
        test.remove();
        displayedLetters.shift();
    }, delaySpeed());
    test.style.animationDuration = convertingLetterSpeed(letterSpeed);
    spawnArea.appendChild(test);
    displayedLetters.push(test);
    count++;
    console.log(`Number count:  ${count}`);
    
}
// letterCreator();
// const interval = setInterval(letterCreator, 1000);
// clearInterval(interval);



// while (true){
//     const interval = setInterval(letterCreator, 1000);
//     letterSpeed -= .1;
// }


// const interval = setInterval(theCaller, 1000)


//Might be the function for the entire game
function daGame () {
    console.log("Letter speed: " + letterSpeed)
    console.log("Spawn Delay: " + spawnDelay);
    console.log("Delete Speed: " + deleteSpeed);
    console.log(missCount);
    const interval = setInterval(theCaller, spawnDelay);



    //Used to call the letter generator
    function theCaller () {
        iterations++
        if (iterations < 5){
            letterCreator();
        }else {
            clearInterval(interval);
            roundOver = true;
            setTimeout(checkToContinue, 2000);
        }
    }
    
}




// daGame();

//Delay speed for set timeout in Letter Creator - Determines when it's deleted
function delaySpeed () {
    deleteSpeed = letterSpeed;
    if (letterSpeed - .2 <= 0){
        return deleteSpeed;
    }else {
        deleteSpeed = (letterSpeed - .2) * 1000;
        return deleteSpeed;
    }
}

function checkMiss() {
    missCount++;
    console.log(missCount);
}

function checkToContinue() {
    let answer = prompt("Would you like to coninue?").toLowerCase();
    if (answer === "y"){
        iterations = 0;
        letterSpeed += difficulty;
        spawnDelay += (difficulty * 200);
        console.log("Current difficulty is " + difficulty);
        daGame();
    }else {
        return;
    }
}

function letterRemove (key) {
    key.remove()
    displayedLetters.shift();
}

//Selecting the random letter to be displayed
function randomLetter() {
    let index;
    index = Math.floor(Math.random() * letterOptions.length);
    return letterOptions[index];
}

function convertingLetterSpeed(number) {
    return number + "s";
}

function convertingLetterSpeed2 (number) {
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



//Need to have every letter move down in intervals that get gradually faster
//The letters are going to be in an array
//Set interval for position
//Looping for positon of the element
//Display none for the position