// Selecting elements from the DOM
let boxes = document.querySelectorAll(".box");
const resetGame = document.querySelector(".reset-btn");
const tieSound = new Audio('moyemoye.mp3');

const winSound = new Audio('winsound.mp3');
const tingSound = new Audio('ting.mp3');
const winnerAnimation = document.querySelector(".win-animation")
const turnPlayer = document.querySelector(".turn-player");
let turn = true;

// Adding event listener to the reset button
resetGame.addEventListener("click", () => {
    // Resetting game state
    winnerAnimation.innerHTML = ``; // Clears the inner HTML of the winnerAnimation element.

    boxes.forEach((box) => {    //  Iterates over each box element,
        box.innerHTML = "";     //  clears its inner HTML,
        box.disabled = false;   //  and enables it.
        tieSound.pause();       //  Pauses the "moyemoye" sound.
    });
});
// Array defining winning combinations on the tic-tac-toe board
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
]
// Adding click event listeners to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Handling player turns and updating the board
        // Sets its inner HTML to "✔️" or "❌" based on the current player's turn.
        if (turn) {
            box.innerHTML = "✔️";   // Toggles the turn
            turn = false;
        }

        else {
            box.innerHTML = "❌";
            turn = true;
        }
        box.disabled = true;    //  Disables the clicked box
        checkWin();     // Check if there's a winner after each move

    })
})
// Function to check if there's a winner or if it's a tie
function checkWin() {
    let tie = true;
    // Displaying the current player's turn
    if (!turn) {

        turnPlayer.innerHTML = "Turn : ❌"

    }
    else {
        turnPlayer.innerHTML = "Turn : ✔️"
    }
    // Checking for winning combinations
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // Displaying winner and playing win sound
                winnerAnimation.innerHTML = `${pos1Val}`;
                winSound.play();
                // Disabling all boxes after a win
                for (let box of boxes) {
                    box.disabled = true;
                }

                tie = false;


            }
        }

    }
    // Checking for a tie
    if (tie) {
        for (let box of boxes) {
            if (box.innerHTML === "") {
                tie = false; // If any box is empty, it's not a tie
                break;
            }
        }
    }

    if (tie) {
        winnerAnimation.innerHTML = "😶";   // Displaying tie emoji
        tieSound.play();
    } else if (!turn) {
        turnPlayer.innerHTML = "Turn : ❌";
        tingSound.play();
    } else {
        turnPlayer.innerHTML = "Turn : ✔️";
        tingSound.play();
    }
}