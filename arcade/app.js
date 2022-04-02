// Starting Game State

const gameState = {
  players: ['x', 'o'],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
}

// Selectors
  //Board
  const gameBoardTable = document.querySelector('#gameBoard');
  
  //Players
  

// Update Cell Function

function updateCell(event) {
  
  let currentPlayer = gameState.players[0];
  const target = event.target;
  const parent = event.target.parentNode;
  
  if (target.tagName === "TD" && target.innerText === "") {
    target.innerText = currentPlayer;
    //update board array 
    gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
    //reverse players array to change first player
    gameState.players.reverse();
  }
  console.log(gameState);
}

gameBoardTable.addEventListener('click', updateCell);

// Game Validator Function


