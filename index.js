//Global Variables
let score = 0;
let playArea = document.querySelector("#play-area")
let scoreDisplay = document.querySelector("#score-display");
const spawnArea = document.querySelector("#spawn-area");


function letterTest () {
    let test = document.createElement("span")
    test.innerText = "B";
    test.classList.add("moving-down");
    playArea.appendChild(test);
}
letterTest();