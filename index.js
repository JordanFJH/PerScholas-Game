//Global Variables
let letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let displayedLetters = []
let iterations = 0;
let count = 0;
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


const interval = setInterval(theCaller, 1000)

// function daGame () {
//     const interval = setInterval(theCaller, 1000)
// }


function theCaller () {
    iterations++
    letterCreator();
    if (iterations > 9){
        clearInterval(interval);
    }
}



//Delay speed for set timeout in Letter Creator
function delaySpeed () {
    if (letterSpeed - .2 <= 0){
        return
    }else {
        return (letterSpeed - .2) * 1000;
    }
}

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