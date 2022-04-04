// Starting Game State

const gameState = {
    players: ['x', 'o'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  };

// Selectors

const startGame = document.querySelector('#start-game');
const table = document.querySelector('table');
const tbody = document.getElementsByTagName('tbody');
const formPlayerOneName = document.querySelector('#form-player-one-name');
const formPlayerTwoName = document.querySelector('#form-player-two-name');
const inputPlayerOneName = document.querySelector('#player-one-name');
const inputPlayerTwoName = document.querySelector('#player-two-name');

// Player Names

let playerNames = [];

// Event Listeners

  //Name Entry -- Player 1
  
  formPlayerOneName.addEventListener('submit', function(event) {
      //const target = event.target;
      //const parent = event.target.parentNode;
      event.preventDefault();
      playerNames.push(inputPlayerOneName.value);
      formPlayerOneName.classList.toggle('hide');
      formPlayerTwoName.classList.toggle('hide');
  });

  // Name Entry -- Player 2
  
  formPlayerTwoName.addEventListener('submit', function(event) {
      event.preventDefault();
      playerNames.push(inputPlayerTwoName.value);
      formPlayerTwoName.classList.toggle('hide');
      console.log(playerNames);
      renderStartingBoard();
  });





function start(event) {
    const target = event.target;
    const parent = event.target.parentNode;
    if (target.tagName === 'BUTTON') {
        parent.classList.toggle('hide');
    }
    renderStartingBoard();
}

startGame.addEventListener('click', start);

function updateCell(event) {
    //const tbody = document.getElementsByTagName('tbody');
   
  
    let currentPlayer = gameState.players[0];
    const target = event.target;
    const parent = event.target.parentNode;
    
    if (target.tagName === "TD" && target.innerText === "") {
      target.innerText = currentPlayer;
      gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
      renderBoard();
      gameState.players.reverse();
    }

    
    
    
}
  
table.addEventListener('click', updateCell);



//Board Renders
    // Starting Render

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

    // Mid-Game Render

function renderBoard() {
    tbody.remove();
    let tableTemplate = '';
    for (let i = 0; i < gameState.board.length; i++) {
        let row = gameState.board[i];
        console.log(row);
        let rowTemplate = `
            <tr data-index = "${i}">
                <td data-index = "0">${row[0]}</td>
                <td data-index = "1">${row[1]}</td>
                <td data-index = "2">${row[2]}</td>
            </tr>
        `
        tableTemplate += rowTemplate;
    }
    table.insertAdjacentHTML("afterbegin", tableTemplate);
}


    
