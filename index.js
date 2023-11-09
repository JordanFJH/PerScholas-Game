//Global Variables
let letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


let score = 0;
let letterSpeed = 4;
let playArea = document.querySelector("#play-area")
let scoreDisplay = document.querySelector("#score-display");
const spawnArea = document.querySelector("#spawn-area");


function letterTest () {
    let test = document.createElement("span")
    test.innerText = randomLetter();
    test.classList.add("moving-down");
    test.style.animationDuration = convertingLetterSpeed(letterSpeed);
    playArea.appendChild(test);
}
letterTest();

setTimeout(letterTest, 1000)

function randomLetter () {
    let index;
    index = Math.floor(Math.random() * letterOptions.length);
    return letterOptions[index];
}

function convertingLetterSpeed (number) {
    return number + "s";
}