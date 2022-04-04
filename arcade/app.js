// Starting Game State

const gameState = {
    players: ['x', 'o'],
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

// Empty Variables & Arrays

let onePlayerGame;
let playerNames = [];

// Event Listeners
  // Select Game Mode

buttonOnePlayerGame.addEventListener('click', function() {
    onePlayerGame = true;
    toggleStartingSections();
});

buttonTwoPlayerGame.addEventListener('click', function() {
    onePlayerGame = false;
    toggleStartingSections();
});

  //Name Entry -- Player 1

formPlayerOneName.addEventListener('submit', function(event) {
    event.preventDefault();
    playerNames.push(inputPlayerOneName.value);
    formPlayerOneName.classList.toggle('hide');
    if (!onePlayerGame) {
        formPlayerTwoName.classList.toggle('hide');
    } 
    else {
        renderStartingBoard();
    }
  });

  // Name Entry -- Player 2
  
formPlayerTwoName.addEventListener('submit', function(event) {
    event.preventDefault();
    playerNames.push(inputPlayerTwoName.value);
    formPlayerTwoName.classList.toggle('hide');
    console.log(playerNames);
    renderStartingBoard();
  });


// Helper Functions
  // Game Mode Select

  let toggleStartingSections = () => {
    sectionSelectGameMode.classList.toggle('hide');
    sectionPlayerNames.classList.toggle('hide');
};  

  // Render Starting Board
  // Game Turns
    // One Player

function updateCell(event) {
    let currentPlayer = gameState.players[0];
    const target = event.target;
    const parent = event.target.parentNode;
    if (target.tagName === "TD" && target.innerText === "") {
      target.innerText = currentPlayer;
      gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
      gameState.players.reverse();
};

function renderStartingBoard() {
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
}



    
    
    
}
  
table.addEventListener('click', updateCell);


    
