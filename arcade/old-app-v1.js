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
  
// Game Validator Functions
  //Selectors
  
  function getRow(gameState, rowIndex) {
    return gameState.board[rowIndex];
  }

  function getColumn(gameState, colIndex) {
    let columnCreator = [];
    for (let i = 0; i < gameState.board.length; ++i) {
      let columnNumber = gameState.board[i];
      columnCreator.push(columnNumber[colIndex]);
    }
    return columnCreator;
  }

  function checkRowAndColumn(array) {
    if (array.join('') === 'xxx') {
      return true;
    } 
    return false;
  }

  function rowValidator(gameState) {
    for (let i = 0; i < gameState.board.length; ++i) {
      if (checkRowAndColumn(getRow(gameState, i))) {
        console.log('You win')
      }
    }
  }

  function columnValidator(gameState) {
    for (let i = 0; i < gameState.board.length; ++i) {
      if(checkRowAndColumn(getColumn(gameState, i))) {
        console.log('You win');
      }
    }
  }

// Update Cell Function

function updateCell(event) {
  
  let currentPlayer = gameState.players[0];
  const target = event.target;
  const parent = event.target.parentNode;
  
  if (target.tagName === "TD" && target.innerText === "") {
    target.innerText = currentPlayer;
  }
  gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
    //reverse players array to change first player
  console.log(gameState.board);

  gameState.players.reverse();
}

gameBoardTable.addEventListener('click', updateCell);



  

