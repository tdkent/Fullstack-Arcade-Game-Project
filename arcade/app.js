// Starting Game State

const gameState = {
    onePlayerGame: null,
    playerNames: [null, null],
    playerMarks: ['x', 'o'],
    playerOrder: {
      firstPlayer: null,
      secondPlayer: null
    },
    turn: 1,
    isGameWon: false,
    isGameTied: false,
    comp: {
      row: null, 
      col: null
    },
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  };

// Select Elements

  // Sections

const sectionSelectGameMode = document.querySelector('#select-game-mode');
const sectionPlayerOneName = document.querySelector('#section-player-one-name');
const sectionPlayerTwoName = document.querySelector('#section-player-two-name');
const sectionTable = document.querySelector('#section-table');
const sectionPlayerHints = document.querySelector('#section-player-hints');
const sectionResetGame = document.querySelector('#section-reset-game');

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
const td = document.querySelectorAll('td');
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
  // Choose Player Order

let playerOrder = () => {
  if(gameState.onePlayerGame === false) {
    if (Math.round(Math.random()) === 0) {
      gameState.playerOrder.firstPlayer = gameState.playerNames[0];
      gameState.playerOrder.secondPlayer = gameState.playerNames[1];
    }
    else if (Math.round(Math.random()) === 1) {
      gameState.playerOrder.firstPlayer = gameState.playerNames[1];
      gameState.playerOrder.secondPlayer = gameState.playerNames[0];
    }
  }
};

  // Game Validation
    // Create Board Arrays

function getRow(gameState, rowIndex) {
  return gameState.board[rowIndex];
};

function getColumn(gameState, colIndex) {
  let columnCreator = [];
  for (let i = 0; i < gameState.board.length; ++i) {
    let columnNumber = gameState.board[i];
    columnCreator.push(columnNumber[colIndex]);
  }
  return columnCreator;
};

function getDiagonalLR(gameState) {
  let diagLR = [];

  for (let i = 0; i < gameState.board.length; i++) {
    let row = gameState.board[i];
    diagLR.push(row[i]);
  }

  return diagLR;
}

function getDiagonalRL(gameState) {
  let diagRL = [];

  for (let i = 0; i < gameState.board.length; i++) {
    let row = gameState.board[i];
    diagRL.push(row[(gameState.board.length - 1) - i]);
  }

  return diagRL;
}

    // Validation Method

function checkRCD(array) {
  let currentPlayerMark = gameState.playerMarks[0];
  if (array.join('') === `${currentPlayerMark}${currentPlayerMark}${currentPlayerMark}`) {
    return true;
  } 
  return false;
};

    // Validators

function rowValidator(gameState) {
  for (let i = 0; i < gameState.board.length; ++i) {
    if (checkRCD(getRow(gameState, i))) {
      gameState.isGameWon = true;
    }
  }
};

function columnValidator(gameState) {
  for (let i = 0; i < gameState.board.length; ++i) {
    if(checkRCD(getColumn(gameState, i))) {
      gameState.isGameWon = true;
    }
  }
};

function diagLRValidator(gameState) {
  if(checkRCD(getDiagonalLR(gameState))) {
    gameState.isGameWon = true;
  }
};

function diagRLValidator(gameState) {
  if(checkRCD(getDiagonalRL(gameState))) {
    gameState.isGameWon = true;
  }
};

    // Run All Validators

let validateBoard = () => {
  if (gameState.turn > 4) {
    rowValidator(gameState);
    columnValidator(gameState);
    diagLRValidator(gameState);
    diagRLValidator(gameState);
  }
}

  // Game Turns
    // Computer
      // Generate Random Numbers

let randomRow = () => Math.floor(Math.random() * gameState.board.length);
let randomCol = () => Math.floor(Math.random() * gameState.board.length);

let computerTurn = () => {
  
  gameState.comp.row = randomRow();
  gameState.comp.col = randomCol();
  let currentPlayer = gameState.playerMarks[0];

  let fillSpace = () => {
    if (gameState.comp.row === 0 && gameState.comp.col === 0) {
      td00.innerText = currentPlayer;
    }
    if (gameState.comp.row === 0 && gameState.comp.col === 1) {
      td01.innerText = currentPlayer;
    }
    if (gameState.comp.row === 0 && gameState.comp.col === 2) {
      td02.innerText = currentPlayer;
    }
    if (gameState.comp.row === 1 && gameState.comp.col === 0) {
      td10.innerText = currentPlayer;
    }
    if (gameState.comp.row === 1 && gameState.comp.col === 1) {
      td11.innerText = currentPlayer;
    }
    if (gameState.comp.row === 1 && gameState.comp.col === 2) {
      td12.innerText = currentPlayer;
    }
    if (gameState.comp.row === 2 && gameState.comp.col === 0) {
      td20.innerText = currentPlayer;
    }
    if (gameState.comp.row === 2 && gameState.comp.col === 1) {
      td21.innerText = currentPlayer;
    }
    if (gameState.comp.row === 2 && gameState.comp.col === 2) {
      td22.innerText = currentPlayer;
    }
  };

  if (gameState.turn < 9) { 
    if (gameState.board[gameState.comp.row][gameState.comp.col] === null) {
      gameState.board[gameState.comp.row][gameState.comp.col] = currentPlayer;
      gameState.turn += 1;

      fillSpace();
      validateBoard();
      isGameWon();
      isGameTied();
      
      if (!gameState.isGameTied && !gameState.isGameWon) {
        createSpan.innerText = `Turn ${gameState.turn}: ${gameState.playerOrder.secondPlayer} just placed an '${gameState.playerMarks[0].toUpperCase()}'. ${gameState.playerOrder.firstPlayer}, it's your turn!`;
        sectionPlayerHints.appendChild(createSpan);
      }
      if (gameState.isGameTied) {
        createSpan.innerText = `The game has ended in a tie. Play again?`;
        sectionPlayerHints.appendChild(createSpan);
      }

    gameState.playerMarks.reverse();  

    }

    else {
      computerTurn();
    }
  }
};

  // Game End
    // Game Win

let isGameWon = () => {
  if (gameState.isGameWon) {
    if (gameState.turn % 2 === 0) {
      createSpan.innerText = `${gameState.playerOrder.firstPlayer} wins the game! Play again?`;
    }
    else {
      createSpan.innerText = `${gameState.playerOrder.secondPlayer} wins the game! Play again?`;
    }
    sectionPlayerHints.appendChild(createSpan);
  }
};

    // Game Tied
let isGameTied = () =>  {
  if (gameState.turn === 10 && !gameState.isGameWon) {
    gameState.isGameTied = true;
    console.log('game tied')
  }
} 

// Events
  // Select Game Mode
    // 1-Player Game

buttonOnePlayerGame.addEventListener('click', function() {
    gameState.onePlayerGame = true;
    sectionSelectGameMode.classList.toggle('hide');
    sectionPlayerOneName.classList.toggle('hide');
    sectionPlayerOneName.classList.toggle('flex');
});
    
    // 2-Player Game
    
buttonTwoPlayerGame.addEventListener('click', function() {
    gameState.onePlayerGame = false;
    sectionSelectGameMode.classList.toggle('hide');
    sectionPlayerOneName.classList.toggle('hide');
    sectionPlayerOneName.classList.toggle('flex');
});

  // Name Entry
    // Player 1

sectionPlayerOneName.addEventListener('submit', function(event) {
  event.preventDefault();
  gameState.playerNames[0] = inputPlayerOneName.value;
  inputPlayerOneName.value = "";
  sectionPlayerOneName.classList.toggle('hide');
  sectionPlayerOneName.classList.toggle('flex');
  if (!gameState.onePlayerGame) {
    sectionPlayerTwoName.classList.toggle('hide');
    sectionPlayerTwoName.classList.toggle('flex');
  } 
  else {
    gameState.playerNames[1] = 'PAL 9000';
    gameState.playerOrder.firstPlayer = gameState.playerNames[0];
    gameState.playerOrder.secondPlayer = gameState.playerNames[1];
    sectionTable.classList.toggle('hide');
    sectionPlayerHints.classList.toggle('hide');
    createSpan.innerHTML = `<p>Welcome to Tic-Tac-Toe! To win the game, race to be the first to have your marks fill a row, column or diagonal!</p><p>${gameState.playerOrder.firstPlayer} is '${gameState.playerMarks[0].toUpperCase()}'s and gets to go first.${gameState.playerOrder.secondPlayer} is '${gameState.playerMarks[1].toUpperCase()}'s and takes second turn.</p><p>Turn 1: Begin!</p>`;
    sectionPlayerHints.appendChild(createSpan);
    sectionResetGame.classList.toggle('hide');
    }
  });

    // Player 2
  
sectionPlayerTwoName.addEventListener('submit', function(event) {
    event.preventDefault();
    gameState.playerNames[1] = inputPlayerTwoName.value;
    inputPlayerTwoName.value = "";
    playerOrder();
    sectionPlayerTwoName.classList.toggle('hide');
    sectionPlayerTwoName.classList.toggle('flex');
    sectionTable.classList.toggle('hide');
    sectionPlayerHints.classList.toggle('hide');
    createSpan.innerText = `Welcome to Tic-Tac-Toe! To win the game, race to be the first to have your marks fill a row, column or diagonal! ${gameState.playerOrder.firstPlayer} is '${gameState.playerMarks[0].toUpperCase()}'s and gets to go first. ${gameState.playerOrder.secondPlayer} is '${gameState.playerMarks[1].toUpperCase()}'s and takes second turn. Turn 1: Begin!`;
    sectionPlayerHints.appendChild(createSpan);
    sectionResetGame.classList.toggle('hide');
  });

    // Game Turns
      // 1-Player Turn

let onePlayerTurn = (event) => {
  
  let currentPlayer = gameState.playerMarks[0];
  const target = event.target;
  const parent = event.target.parentNode;
  
  if (gameState.onePlayerGame) {
    if (!gameState.isGameWon) {
      if (target.tagName === "TD" && target.innerText === "") {
        target.innerText = currentPlayer;
        gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
        gameState.turn += 1;

        validateBoard();
        isGameWon();
        isGameTied();
      
        gameState.playerMarks.reverse();

        if (!gameState.isGameTied && !gameState.isGameWon) {
          createSpan.innerText = `Turn ${gameState.turn}: ${gameState.playerOrder.firstPlayer} just placed an '${gameState.playerMarks[1].toUpperCase()}'. ${gameState.playerOrder.secondPlayer} is processing options. Just a moment. Just a moment.`;
          sectionPlayerHints.appendChild(createSpan);
        }
        if(gameState.isGameTied) {
          createSpan.innerText = `The game has ended in a tie. Play again?`;
          sectionPlayerHints.appendChild(createSpan);
        }
      
        if (!gameState.isGameWon) {
          setTimeout(() => {computerTurn()}, 3000);
        }
      }
    }
  }
};

table.addEventListener('click', onePlayerTurn);

      // 2-Player Game

let twoPlayerGameTurn = (event) => {
  let currentPlayer = gameState.playerMarks[0];
  const target = event.target;
  const parent = event.target.parentNode;

  if (!gameState.onePlayerGame && !gameState.isGameWon) {
    if (target.tagName === "TD" && target.innerText === "") {
      gameState.turn += 1;
      target.innerText = currentPlayer;
      gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
            
      validateBoard();
      isGameWon();
      isGameTied();

      gameState.playerMarks.reverse();

      if (!gameState.isGameTied && !gameState.isGameWon) {
        if (gameState.turn % 2 === 0) {
          createSpan.innerText = `Turn ${gameState.turn}: ${gameState.playerOrder.firstPlayer} just placed an '${gameState.playerMarks[1].toUpperCase()}'. ${gameState.playerOrder.secondPlayer}, it's your turn next. Place your ${gameState.playerMarks[0].toUpperCase()} on the board!`;
        }
        else {
          createSpan.innerText = `Turn ${gameState.turn}: ${gameState.playerOrder.secondPlayer} just placed an '${gameState.playerMarks[1].toUpperCase()}'. ${gameState.playerOrder.firstPlayer}, it's your turn next. Place your ${gameState.playerMarks[0].toUpperCase()} on the board!`;
        }
        sectionPlayerHints.appendChild(createSpan);
      }
      if(gameState.isGameTied) {
        createSpan.innerText = `The game has ended in a tie. Play again?`;
        sectionPlayerHints.appendChild(createSpan);
      }
    }
  }
};

table.addEventListener('click', twoPlayerGameTurn);

  // Game Reset
  
  let resetGame = () => {
    
    gameState.onePlayerGame = null;
    gameState.playerNames = [null, null];
    gameState.playerMarks = ['x', 'o'];
    gameState.turn = 1;
    gameState.isGameWon = false;
    gameState.isGameTied = false;
    gameState.board = [[null, null, null], [null, null, null], [null, null, null]];

    td00.innerText = "";
    td01.innerText = "";
    td02.innerText = "";
    td10.innerText = "";
    td11.innerText = "";
    td12.innerText = "";
    td20.innerText = "";
    td21.innerText = "";
    td22.innerText = "";
    
    sectionSelectGameMode.classList.toggle('hide');
    sectionTable.classList.toggle('hide');
    sectionPlayerHints.classList.toggle('hide');
    sectionResetGame.classList.toggle('hide');

    gameState.playerOrder.firstPlayer = null;
    gameState.playerOrder.secondPlayer = null;

  };

  sectionResetGame.addEventListener('click', resetGame);