// Selectors

const gameBoardTable = document.querySelector('#gameBoard');

function updateCell(event) {
    const target = event.target;
    if (target.tagName === "TD") {
        target.innerText = "x"
    }
}

gameBoardTable.addEventListener('click', updateCell);