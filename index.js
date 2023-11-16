//Global Variables
let letterOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let names = ["Stacy", "Casey", "Emily", "Natalie", "Ashley", "Olivia", "Jane"]
let displayedLetters = []
let roundOver = false;
let gameStatus = true;
let missCount;
let missDelay = 30;
let deleteSpeed = 0;
let iterations;
let count = 0;
let points;
let roundNumber; //Round Number the player is on
let letterSpeed;
let missInterval; //Holds the set interval for the miss count
let spawnInterval;
let spawnDelay = Math.floor((letterSpeed * 1000) / 3);
let streakNumber = 0;
let newHighScore = false; //Boolean to check if there's a new highscore
let longestStreak = 0;
//Global DOM Variables
const page1 = document.querySelector("#page-1");
const page2 = document.querySelector("#page-2");
const bgMusic = new Audio("Resources/Audio/Background_Music.mp3");
const highScores = document.querySelectorAll("#high-scores-container span");
const roundEl = document.querySelector("#round-holder h4");
const streakNumberEl = document.querySelector("#streak-number");
const startButton = document.querySelector("#start-button");
const scoreRef = document.querySelector("#score");
const body = document.querySelector("body");
const bounds = document.querySelector("#bounds");
let playArea = document.querySelector("#play-area")
let scoreDisplay = document.querySelector("#score-display");
const spawnArea = document.querySelector("#spawn-area");
const startScreen = document.querySelector("#start-screen")
const endScreen = document.querySelector("#end-screen");
const restartButton = document.querySelector("#restart");



page1.addEventListener("click", function (evt) {
    console.log(evt);
    page1.style.zIndex = "-21";
})

page2.addEventListener("click", function (evt) {
    console.log(evt);
    page2.style.zIndex = "-22";
})



//start button to start the game
startButton.addEventListener("click", function (evt) {
    startScreen.style.zIndex = "-20";
    bgMusic.play();
    gameInitialize();
    gameStart();
    
})

//The button for restarting the game from the end screen
restartButton.addEventListener("click", function(evt){
    if (newHighScore) {
        let oldScore = document.querySelector("#end-screen h2:last-child")
        oldScore.remove();
    }
    endScreen.style.zIndex = "-10";
    bgMusic.currentTime = 0; //Resets the music
    bgMusic.play();
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


/*
********************************************
* 
*FUNCTIONS
*
********************************************
*/

//Spawning the letter
function letterCreator() {
    let letter = document.createElement("span")
    letter.innerText = randomLetter();
    letter.classList.add(chooseClass());
    letter.style.animationDuration = convertingLetterSpeed(letterSpeed);
    chooseLetterColor(letter);
    spawnArea.appendChild(letter);
    displayedLetters.push(letter);
    count++;
    console.log(`Number count:  ${count}`);

}


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


// Controls the iterations of number of letters displayed each round
function theCaller() {
    iterations++
    if (iterations <= 8) {
        letterCreator();
    } else {
        clearInterval(spawnInterval);
        roundOver = true;
        setTimeout(roundContinue, 2100);
    }
}



//Adjusts the speed of each round called in roundcontinue
function adjustSpeed() {
    letterSpeed = (letterSpeed - .15).toFixed(2);
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

//Chooses the random class that effects the difficulty of the letter going down depending on what round the player is on
function chooseClass() {
    let chosenClass = "";
    if (roundNumber <= 6) { //Adds seperate class of moving side to increase difficulty after certain round
        chosenClass = "moving-down";
    } else if (roundNumber <= 10){
        let randNum = Math.round(Math.random() * 2);
        switch (randNum) {
            case 0:
                chosenClass = "moving-down";
                break;
            case 1:
                chosenClass = "moving-down-2";
                break;
            case 2:
                chosenClass = "moving-down-2-2";
                break;
            default:
                console.log("something went wrong in chooseClass function");
                break;
        }
    } else {
        let randNum = Math.round(Math.random() * 3);
        switch (randNum) {
            case 0:
                chosenClass = "moving-down";
                break;
            case 1:
                chosenClass = "moving-down-2";
                break;
            case 2:
                chosenClass = "moving-down-2-2";
                break;
            case 3:
                chosenClass = "moving-down-3";
                break;
            default:
                console.log("something went wrong in chooseClass function");
                break;
        }
    }
    return chosenClass;
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
    //Selects random audio when the player misses a letter
    let audioList = ["Resources/Audio/Exams.mp3", "Resources/Audio/HomeWork.mp3", "Resources/Audio/Rough_Draft.mp3", "Resources/Audio/Study.mp3", "Resources/Audio/Syllabus.mp3", "Resources/Audio/Thesis.mp3", ]
    let randNum;
    randNum = Math.floor(Math.random() * audioList.length);
    let lastLife = document.querySelector("#bounds :last-child");
    lastLife.classList.add("vaporize");
    let audio = new Audio (audioList[randNum]);
    audio.play();
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
        adjustSpeed(); //Makes the letters and spawn delay faster
        sleep(1500); // Pauses the games between rounds
        if (roundNumber === 7) {
            addBookPictures();
        }
        playNextlevel();
        iterations = 0;
        roundAnimate();
        gameStart();
    }
    
}

//Plays the animation of the round number bouncing
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
    let audio = new Audio("Resources/Audio/Retro_Explosionn.mp3")
    audio.play();
}

//Plays next level sound for player making it to the next level
function playNextlevel() {
    let audio = new Audio("Resources/Audio/Next_Level.mp3");
    audio.play();
}

//Removes active letter that was pressed
function letterRemove(key) {
    // let linger = key.getBoundingClientRect();
    // console.log(linger.top);
    key.remove();
    displayedLetters.shift();
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

//Changes letter color if it's capatalized to be easier to see
function chooseLetterColor(letter) {
    if (!(letterOptions.includes(letter.innerText))) {
        letter.style.color = "darkblue";
    }
}

//Adds the additional book pictures after round 6
function addBookPictures() {
    let pic1 = document.createElement("img");
    let pic2 = document.createElement("img");
    pic1.src = "Resources/Images/book.png"
    pic1.classList.add("book-2");
    playArea.appendChild(pic1)
    pic2.src = "Resources/Images/book.png"
    pic2.classList.add("book-3");
    playArea.appendChild(pic2)
}

//Updates the score with the active streak bonus
function updateScore(pointstoAdd) {
    points += (streakNumber * 10) + pointstoAdd;
    scoreRef.innerText = points;
}


//Updates the active streak number depending on if player hits, misses, or gusess wrong letter
function updateStreak (bool) {
    bool === true ? streakNumber++ : streakNumber = 0;
    if (streakNumber > longestStreak) {
        longestStreak = streakNumber;
    }
    streakNumberEl.innerText = streakNumber;
}

// Converts the letterspeed into a string to be read by the css file
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
            newHighScore = true;
            lowest = highScores[i].innerText;
            highScores[i].innerText = newLow;
            newLow = lowest;
        }
    }
}

//Sets all the variables to their base for the start of the game
function gameInitialize(){
    missInterval = setInterval(checkMiss, missDelay);
    makeLives();
    //Removes the added book pictures if round was greater than six in previous round
    if (roundNumber > 6) {
        let deleteMe1 = document.querySelector(".book-2");
        let deleteMe2 = document.querySelector(".book-3");
        deleteMe1.remove();
        deleteMe2.remove();
    }
    roundNumber = 1;
    roundEl.innerText = roundNumber;
    iterations = 0;
    points = 0;
    newHighScore = false;
    scoreRef.innerText = 0;
    missCount = 0;
    letterSpeed = 3;
    spawnDelay = Math.floor((letterSpeed * 1000) / 4);
    gameStatus = true;
}


//The game over function for when the game is over
function gameOver() {
    bgMusic.pause();
    //Plays game over sound
    let audio = new Audio("Resources/Audio/Game_Over_Sound.mp3")
    audio.play();
    gameStatus = false;
    console.log("The game is over")
    //first wave of deleting all the letters, combined with another for loop, working for now
    for (let i = 0; i < displayedLetters.length; i++){
        displayedLetters[0].remove();
        displayedLetters.shift();
        console.log("Letter removed")
    }
    //Second wave of deleting the remaining letters from the screen since I need 2 apparently
    for (let letter of displayedLetters) { 
        displayedLetters.pop();
        letter.remove();
        console.log("Letter removed")
    }
    clearInterval(spawnInterval);
    updateHighScores(points)
    displayEndScreen();
}

//displays end screen and all relative info
function displayEndScreen() {
    endScreen.style.zIndex = "10";
    let randNum = (Math.floor(Math.random() * names.length))
    let displayName = names[randNum];
    let kidName = document.querySelector("#student-name")
    let longStreak = document.querySelector("#end-screen p");
    kidName.innerText = `You've helped little ${displayName} procrstinate long enough.`
    longStreak.innerText = longestStreak;
    //Adds the newhighscore message if player gets new highscore
    if (newHighScore) {
        let showHigh = document.createElement("h2");
        showHigh.innerText = "Congrats on a new score on the leaderboard!"
        endScreen.appendChild(showHigh);
    }
}