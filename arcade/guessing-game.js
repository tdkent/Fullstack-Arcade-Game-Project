
// Random Number Generator

function numGenerator() {
    return Math.floor(Math.random() * 100 + 1);
  }

let randomNumber = numGenerator();

//Selectors

const form = document.querySelector('#gameForm');
const ul = document.querySelector('#guess');
const hintDiv = document.querySelector('#hint');
const input = document.querySelector('#number');
const button = document.querySelector('#button');
const resetButton = document.querySelector('#reset');

//New Elements
const newSpan = document.createElement('span');

//Empty Array (to Keep Track of Turns and Li)
let arr = [];

//Game Turn Function
const gameTurn = function(event) {

    //Correct Answer
    console.log(randomNumber);
    
    //Prevent Default Form Actions
    event.preventDefault();
    
    //Turn String into Number
    const guess = Number(input.value);

    //Push Guesses into Array
    arr.push(guess);
    //console.log(arr);
    //console.log(arr.length);

    //Add Guesses to Empty Li
    let li = document.querySelector(`#li${arr.length}`);
    li.innerText = input.value; 

    //If Guess is Correct
    if (guess === randomNumber) {
        form.classList.toggle("hide");
        resetButton.classList.toggle("hide");
        newSpan.innerText = "'Wro-- hey, wait, you got it right! You won the game! You should be ecstatic! Why aren't you jumping for joy? Oh, you want a prize? Cash money, is that it? Forget it, pal, it's just a student project.' - Stranger";
        hintDiv.appendChild(newSpan);
    }
    
    //Hints if Guess is Too Big
    if (guess - randomNumber >= 50) {
        //console.log("ICE COLD, GUESS HIGHER!!")
        newSpan.innerText = "'You're ice cold. Hypothermic, really. Now put on another layer and guess a much smaller number, pal.'";
        console.log(newSpan.innerText);
        hintDiv.appendChild(newSpan);
    }
    if (guess - randomNumber >= 25 && guess - randomNumber < 50) {
        //console.log("You're very cold. Guess a larger number!");
        newSpan.innerText = "'You're cold. Is that the sound of your teeth chattering, pal? Guess a smaller number!'";
        hintDiv.appendChild(newSpan);
    }
    if (guess - randomNumber >=10 && guess - randomNumber < 25) {
        //console.log("Getting a bit warm, but you need to guess a larger number!");
        newSpan.innerText = "'Getting a bit warm, pal, but you need to guess a smaller number!'";
        hintDiv.append(newSpan);
    }
    if (guess - randomNumber >= 5 && guess - randomNumber < 10) {
        newSpan.innerText = "'You're warm, pal. Quite warm. Guess a little smaller.'";
        hintDiv.append(newSpan);
    }
    if (guess - randomNumber >= 2 && guess - randomNumber < 5) {
        newSpan.innerText = "'You're hot, pal. Make sure you're staying hydrated. But your guess is a little too high.'";
        hintDiv.append(newSpan);
    }
    
    //Hints if Guess is Too Small
    if (guess - randomNumber <= -50) {
        //console.log("ICE COLD, GUESS HIGHER!!")
        newSpan.innerText = "'You're ice cold. Hypothermic, really. Now put on another layer and guess a larger number, pal.'";
        console.log(newSpan.innerText);
        hintDiv.appendChild(newSpan);
    }
    if (guess - randomNumber > -50 && guess - randomNumber <= -25) {
        //console.log("You're very cold. Guess a larger number!");
        newSpan.innerText = "'You're very cold. Is that the sound of your teeth chattering, pal? Guess a larger number!'";
        hintDiv.appendChild(newSpan);
    }
    if (guess - randomNumber > -25 && guess - randomNumber <= -10) {
        //console.log("Getting a bit warm, but you need to guess a larger number!");
        newSpan.innerText = "'Getting a bit warm, pal, but you need to guess a larger number!'";
        hintDiv.append(newSpan);
    }
    if (guess - randomNumber > -10 && guess - randomNumber <= -5) {
        newSpan.innerText = "'You're warm, pal. Quite warm. Guess a little bigger.'";
        hintDiv.append(newSpan);
    }
    if (guess - randomNumber > -5 && guess - randomNumber <= -2) {
        newSpan.innerText = "'You're hot, pal. Make sure you're staying hydrated. But your guess is a little too low.'";
        hintDiv.append(newSpan);
    }

    //Hint if Guess is Off by Only 1
    if (guess - randomNumber === -1 || guess - randomNumber === 1) {
        newSpan.innerText = "'You're incandescent, pal. An open reactor core. A slight change either way and you have it.'";
        hintDiv.append(newSpan);
    }

    //If player runs out of turns
    if (arr.length === 5 && randomNumber !== guess) {
        form.classList.toggle("hide");
        resetButton.classList.toggle("hide");
        newSpan.innerText = `'You ran out of turns and lost the game, pal. Ya blew it! Oh, and the correct answer was ${randomNumber}.' - Stranger`;
        hintDiv.append(newSpan);
    }
    
    //Refresh Field
     input.value = "";
}

form.addEventListener('submit', gameTurn);

const resetGame = function() {
    //Generate new random number
    randomNumber = numGenerator();

    //Toggle buttons
    form.classList.toggle('hide');
    resetButton.classList.toggle('hide');

    //Remove li and span text
    for (let i = 1; i <= arr.length; i++) {
        let liFinder = document.querySelector(`#li${i}`)
        liFinder.innerText = "";
    }
    
    newSpan.innerText = "";
    
    //Reset array
    arr = [];

};

reset.addEventListener('click', resetGame);