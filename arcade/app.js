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

  // Render Starting Board

//let = () => {
//    let tableTemplate = '';
//    for (let i = 0; i < gameState.board.length; i++) {
//        const rowTemplate = `
//            <tr data-index = "${i}">
//                <td data-index = "0"></td>
//                <td data-index = "1"></td>
//                <td data-index = "2"></td>
//            </tr>
 //       `
//      tableTemplate += rowTemplate;
//    }
//    table.innerHTML = tableTemplate;
//};

  // Game Turns
    // Generate Random Array Values

  //let generateRandomRow = () => Math.floor(Math.random() * gameState.board.length);

  //let generateRandomCell = () => Math.floor(Math.random() * gameState.board.length);

    // One Player


let computerTurn = () => {
  
  let cellIsEmpty;
  let randomRow;
  let randomCell;
  
  let newRandomRow = () => Math.floor(Math.random() * gameState.board.length);
  let newRandomCell = () => Math.floor(Math.random() * gameState.board.length);
  
  let isCellEmpty = () => {
    randomRow = newRandomRow();
    randomCell = newRandomCell();
    if (gameState.board[randomRow][randomCell] !== null) {
      cellIsEmpty = false;
    }
    else if (gameState.board[randomRow][randomCell] === null) {
      cellIsEmpty = true;
    }
  };
  
  isCellEmpty();
  
  if (!cellIsEmpty) {
    isCellEmpty();
  }
  if (cellIsEmpty) {
    gameState.board[randomRow][randomCell] = gameState.playerMarks[0];
    if (randomRow === 0 && randomCell === 0) {
      td00.innerText = gameState.playerMarks[0];
    }
    if (randomRow === 0 && randomCell === 1) {
      td01.innerText = gameState.playerMarks[0];
    }
    if (randomRow === 0 && randomCell === 2) {
      td02.innerText = gameState.playerMarks[0];
    }
    if (randomRow === 1 && randomCell === 0) {
      td10.innerText = gameState.playerMarks[0];
    }
    if (randomRow === 1 && randomCell === 1) {
      td11.innerText = gameState.playerMarks[0];
    }
    if (randomRow === 1 && randomCell === 2) {
      td12.innerText = gameState.playerMarks[0];
    }
    if (randomRow === 2 && randomCell === 0) {
      td20.innerText = gameState.playerMarks[0];
    }
    if (randomRow === 2 && randomCell === 1) {
      td21.innerText = gameState.playerMarks[0];
    }
    if (randomRow === 2 && randomCell === 2) {
      td22.innerText = gameState.playerMarks[0];
    }
  }
};

let onePlayerTurn = (event) => {
    let currentPlayer = gameState.playerMarks[0];
    const target = event.target;
    const parent = event.target.parentNode;
    

    if (firstPlayer !== 'COMPUTER') {
      if (target.tagName === "TD" && target.innerText === "") {
        target.innerText = currentPlayer;
        gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
        //Run validators?
        gameState.playerMarks.reverse();
        computerTurn();
        gameState.playerMarks.reverse();
      }
    }
    else if (firstPlayer === 'COMPUTER') {
      computerTurn();
      gameState.playerMarks.reverse();
    }
  };

    //if (target.tagName === "TD" && target.innerText === "") {
      //if (firstPlayer !== 'COMPUTER')
        //target.innerText = currentPlayer;
        //gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
        //gameState.playerMarks.reverse();
    //} 
      //if (firstPlayer === 'COMPUTER') {
      //gameState.board[Math.floor(Math.random() * gameState.board.length)][Math.floor(Math.random() * //gameState.board.length)] = currentPlayer;
      //console.log(gameState.board);

    //}
//};
    
    // Two Player

////let twoPlayerTurn = event => {
    //let currentPlayer = gameState.playerMarks[0];
    //const target = event.target;
    //const parent = event.target.parentNode;
    //if (target.tagName === "TD" && target.innerText === "") {
      //target.innerText = currentPlayer;
      //gameState.board[parent.dataset.index][target.dataset.index] = currentPlayer;
      //gameState.playerMarks.reverse();
    //}
//};

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
      gameState.playerNames[1] = 'COMPUTER';
      console.log(gameState.playerNames);
      playerOrder();
      console.log(`1st player is ${firstPlayer}, 2nd player is ${secondPlayer}`);
      sectionTable.classList.toggle('hide');
    }
  });

  // Name Entry -- Player 2
  
formPlayerTwoName.addEventListener('submit', function(event) {
    event.preventDefault();
    gameState.playerNames[1] = inputPlayerTwoName.value;
    playerOrder();
    console.log(`1st player is ${firstPlayer}, 2nd player is ${secondPlayer}`);
    formPlayerTwoName.classList.toggle('hide');
  });

  // Game Turns

table.addEventListener('click', onePlayerTurn);