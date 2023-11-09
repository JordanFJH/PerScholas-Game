//Global Variables
let letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let displayedLetters = []
let spot = 0;
let spotter;
let score = 0;
let letterSpeed = 3;
let playArea = document.querySelector("#play-area")
let scoreDisplay = document.querySelector("#score-display");
const spawnArea = document.querySelector("#spawn-area");

class Letter {
    constructor(letter) {
        this.letter = randomLetter();
    }
    move() {
        spot += .2;
        spotter = spot + "%";
        this.style.top = spotter;
        if (spot < 100) {
            requestAnimationFrame(move);
        }
        else {
            thing.remove();
        }
    }
}

//Spawning the letter
function letterCreator() {
    let test = document.createElement("span")
    test.innerText = randomLetter();
    test.classList.add("moving-down");
    setTimeout(() => {
        test.remove();
        displayedLetters.shift();
        console.log(displayedLetters);
    }, (letterSpeed - .2) * 1000);
    test.style.animationDuration = convertingLetterSpeed(letterSpeed);
    spawnArea.appendChild(test);
    displayedLetters.push(test);
    console.log(displayedLetters);
}
letterCreator();
const interval = setInterval(letterCreator, 1000);
clearInterval(interval);








function randomLetter() {
    let index;
    index = Math.floor(Math.random() * letterOptions.length);
    return letterOptions[index];
}

function convertingLetterSpeed(number) {
    return number + "s";
}





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