// Starting Game State

const gameState = {
    onePlayerGame: null,
    playerNames: [null, null],
    playerMarks: ['x', 'o'],
    turn: 1,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  };

// Empty Variables

let firstPlayer;
let secondPlayer;

// Select Elements

  // Sections

  const sectionSelectGameMode = document.querySelector('#select-game-mode');
  const sectionPlayerNames = document.querySelector('#section-player-names');
  const sectionTable = document.querySelector('#section-table');
  const sectionPlayerHints = document.querySelector('#section-player-hints');

    // Forms

  const formPlayerOneName = document.querySelector('#form-player-one-name');
  const formPlayerTwoName = document.querySelector('#form-player-two-name');
  const inputPlayerOneName = document.querySelector('#input-player-one-name');
  const inputPlayerTwoName = document.querySelector('#input-player-two-name');

    // Buttons

  const buttonOnePlayerGame = document.querySelector('#button-one-player-game');
  const buttonTwoPlayerGame = document.querySelector('#button-two-player-game'); 

    // Table

  const table = document.querySelector('table');
  const td00 = document.querySelector('#c-00');
  const td01 = document.querySelector('#c-01');
  const td02 = document.querySelector('#c-02');
  const td10 = document.querySelector('#c-10');
  const td11 = document.querySelector('#c-11');
  const td12 = document.querySelector('#c-12');
  const td20 = document.querySelector('#c-20');
  const td21 = document.querySelector('#c-21');
  const td22 = document.querySelector('#c-22');

// Create Elements

const createSpan = document.createElement('span');

// Helper Functions
  // Game Mode Select

let toggleStartingSections = () => {
    sectionSelectGameMode.classList.toggle('hide');
    sectionPlayerNames.classList.toggle('hide');
};

  // Choose Player Order

let playerOrder = () => {
  if(gameState.onePlayerGame === false) {
    if (Math.round(Math.random()) === 0) {
      firstPlayer = gameState.playerNames[0];
      secondPlayer = gameState.playerNames[1];
    }
    else if (Math.round(Math.random()) === 1) {
      firstPlayer = gameState.playerNames[1];
      secondPlayer = gameState.playerNames[0];
    }
  }
};

// Events
  // Select Game Mode
    // 1-Player Game

buttonOnePlayerGame.addEventListener('click', function() {
    gameState.onePlayerGame = true;
    toggleStartingSections();
});
    
    // 2-Player Game
    
buttonTwoPlayerGame.addEventListener('click', function() {
    gameState.onePlayerGame = false;
    toggleStartingSections();
});

  // Name Entry
    // Player 1

  formPlayerOneName.addEventListener('submit', function(event) {
    event.preventDefault();
    gameState.playerNames[0] = inputPlayerOneName.value;
    formPlayerOneName.classList.toggle('hide');
    if (!gameState.onePlayerGame) {
      formPlayerTwoName.classList.toggle('hide');
    } 
    else {
      gameState.playerNames[1] = 'COMPUTER';
      console.log(gameState.playerNames);
      playerOrder();
      console.log(`1st player is ${firstPlayer}, 2nd player is ${secondPlayer}`);
      sectionTable.classList.toggle('hide');
    }
  });

    // Player 2
  
formPlayerTwoName.addEventListener('submit', function(event) {
    event.preventDefault();
    gameState.playerNames[1] = inputPlayerTwoName.value;
    playerOrder();
    console.log(`1st player is ${firstPlayer}, 2nd player is ${secondPlayer}`);
    formPlayerTwoName.classList.toggle('hide');
    sectionTable.classList.toggle('hide');
    createSpan.innerText = `Welcome to Tic-Tac-Toe! To win the game, race to be the first to have your marks fill a row, column or diagonal! ${firstPlayer} is '${gameState.playerMarks[0].toUpperCase()}'s and gets to go first. ${secondPlayer} is '${gameState.playerMarks[1].toUpperCase()}'s and takes second turn. Turn 1: Begin!`;
    sectionPlayerHints.appendChild(createSpan);
  });

    // Game Turns
      // 2-Player Game

let twoPlayerGameTurn = (event) => {
    let currentPlayer = gameState.playerMarks[0];
    const target = event.target;
    const parent = event.target.parentNode;
    if (!gameState.onePlayerGame) {
        if (target.tagName === "TD" && target.innerText === "") {
            gameState.turn += 1;
            target.innerText = currentPlayer;
            gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
            // Validation Goes Here
            gameState.playerMarks.reverse();
            if (gameState.turn % 2 === 0) {
                createSpan.innerText = `Turn ${gameState.turn}: ${firstPlayer} just placed an '${gameState.playerMarks[1].toUpperCase()}'. ${secondPlayer}, it's your turn next. Place your ${gameState.playerMarks[0].toUpperCase()} on the board!`;
            }
            else {
                createSpan.innerText = `Turn ${gameState.turn}: ${secondPlayer} just placed an '${gameState.playerMarks[1].toUpperCase()}'. ${firstPlayer}, it's your turn next. Place your ${gameState.playerMarks[0].toUpperCase()} on the board!`;
            }
            sectionPlayerHints.appendChild(createSpan);
        }
    }
}

table.addEventListener('click', twoPlayerGameTurn);