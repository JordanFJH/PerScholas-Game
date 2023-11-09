//Global Variables
let promptOptions = [];
let score = 0;
let letterSpeed = 4;
let playArea = document.querySelector("#play-area")
let scoreDisplay = document.querySelector("#score-display");
const spawnArea = document.querySelector("#spawn-area");


function letterTest () {
    let test = document.createElement("span")
    test.innerText = "B";
    test.classList.add("moving-down");
    test.style.animationDuration = convertingLetterSpeed(letterSpeed);
    playArea.appendChild(test);
}
letterTest();

setTimeout(letterTest, 1000)

function convertingLetterSpeed (number) {
    return number + "s";
}