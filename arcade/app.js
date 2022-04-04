// Starting Game State

const gameState = {
    onePlayerGame: null,
    playerNames: [null, null],
    playerMarks: ['x', 'o'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  };

// Select Elements
  // Sections
const sectionSelectGameMode = document.querySelector('#select-game-mode');
const sectionPlayerNames = document.querySelector('#section-player-names');
const sectionPlayerHints = document.querySelector('#section-player-hints');
const sectionStartGame = document.querySelector('#section-start-game');
  // Forms
const formPlayerOneName = document.querySelector('#form-player-one-name');
const formPlayerTwoName = document.querySelector('#form-player-two-name');
const inputPlayerOneName = document.querySelector('#input-player-one-name');
const inputPlayerTwoName = document.querySelector('#input-player-two-name');
  // Buttons
const buttonOnePlayerGame = document.querySelector('#button-one-player-game');
const buttonTwoPlayerGame = document.querySelector('#button-two-player-game'); 


  // Game Board
const table = document.querySelector('table');

// Create Elements

const createSpan = document.createElement('span');

// Helper Functions
  // Game Mode Select

let toggleStartingSections = () => {
    sectionSelectGameMode.classList.toggle('hide');
    sectionPlayerNames.classList.toggle('hide');
};  

  // Render Starting Board

let renderStartingBoard = () => {
    let tableTemplate = '';
    for (let i = 0; i < gameState.board.length; i++) {
        const rowTemplate = `
            <tr data-index = "${i}">
                <td data-index = "0"></td>
                <td data-index = "1"></td>
                <td data-index = "2"></td>
            </tr>
        `
        tableTemplate += rowTemplate;
    }
    table.innerHTML = tableTemplate;
};

  // Game Turns
    // One Player

let onePlayerTurn = (event) => {
    let currentPlayer = gameState.playerMarks[0];
    const target = event.target;
    const parent = event.target.parentNode;
    if (target.tagName === "TD" && target.innerText === "") {
        target.innerText = currentPlayer;
        gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
        gameState.playerMarks.reverse();
    }
};
    
    // Two Player

let twoPlayerTurn = event => {
    let currentPlayer = gameState.playerMarks[0];
    const target = event.target;
    const parent = event.target.parentNode;
    if (target.tagName === "TD" && target.innerText === "") {
      target.innerText = currentPlayer;
      gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
      gameState.playerMarks.reverse();
    }
};

// Event Listeners
  // Select Game Mode

  buttonOnePlayerGame.addEventListener('click', function() {
    gameState.onePlayerGame = true;
    toggleStartingSections();
});

buttonTwoPlayerGame.addEventListener('click', function() {
    gameState.onePlayerGame = false;
    toggleStartingSections();
});

  // Name Entry -- Player 1

formPlayerOneName.addEventListener('submit', function(event) {
    event.preventDefault();
    gameState.playerNames[0] = inputPlayerOneName.value;
    formPlayerOneName.classList.toggle('hide');
    if (!gameState.onePlayerGame) {
        formPlayerTwoName.classList.toggle('hide');
    } 
    else {
        renderStartingBoard();
    }
  });

  // Name Entry -- Player 2
  
formPlayerTwoName.addEventListener('submit', function(event) {
    event.preventDefault();
    gameState.playerNames[1] = inputPlayerTwoName.value;
    formPlayerTwoName.classList.toggle('hide');
    renderStartingBoard();
  });

  // Game Turns

table.addEventListener('click', onePlayerTurn);





    
