const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText"); //not sure why the querySelectorAll didn't work here tbh
const restartBtn = document.querySelector("#restartButton"); // same here, it just wouldn't allow the code to run
const winConditions = [
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
/*
winConditions is an array of arrays of the potential winning configurations of the cell locations
options is an array of placeholders, an empty string for each cell
*/
let currentPlayer = "X";
let running = false;

startGame()

function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
/*
any of the setup that we need to start the game, 
each cell has an eventListener for a click to invoke the cellClicked() 
*/

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
/*
defining the cellIndex whenever the cell is clicked on, and updating the placeholder
only if there are no values present, 
as well, invoking the updateCell() and pushing through the 'this' variable and the 
cellIndex value that was created
After every click, the checkWinner() is invoked
*/

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
/*
two parameters, cell and index
out of the options array, the index is defined and made equal to the currentPlayer, 
which allows us to update the placeholders as the defined X and O of the currentPlayer,
to set the board up for the checkWinner() 
*/


function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
/*
if current player is equal to X, we will reassign our current player to O, 
otherwise it will be changed to X. Then, the statusText gets changed to represent
the player change
*/

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB  == "" || cellC == ""){
            continue;
        } 
        if (cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        } 
    }

    if (roundWon){
        statusText.textContent = `${currentPlayer} wins!`
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}
/*
checkWinner() primarily utilizes the winConditions arrays to determine a winner
A for loop is utilized to loop through all the conditions of the array to check against
the assigned X's and O's placed by the updateCell(). If the winning conditions are met, it 
flips the boolean variable roundWon to true, which then triggers the if-else statement which 
stops the game and returns the player that won to the statusText block
*/

function restartGame() {
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "")
    running = true;
}
/*
essentially clears out all the variables and resets to base code to begin the game again
*/

