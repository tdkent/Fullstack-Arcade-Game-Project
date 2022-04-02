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
  }
    
  //console.log(target.dataset.index);
  //console.log(parent.dataset.index);
  gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
  console.log(gameState);

  //reverse players array
  gameState.players.reverse();
}

gameBoardTable.addEventListener('click', updateCell);