// Initialise state variables
function initialiseStates(state) {
    var restartbtn = document.getElementById("restartbtn");
    state.turn = "circle";
    state.active = false;
    restartbtn.textContent = "Start game"
}

function updateGameStatus(state) {
    var gameStatus = document.getElementById("gamestatus");
    var restartbtn = document.getElementById("restartbtn");
    if (state.active === true) {
        restartbtn.style.color = "#FF6C00";
        restartbtn.style.borderColor = "#FF6C00";
        restartbtn.textContent = "Game is in progress..."
    } else if (state.active === false) {
        if (restartbtn.textContent === "Start game") {
            restartbtn.style.color = "#FF6C00";
            restartbtn.style.borderColor = "#FF6C00";
            restartbtn.textContent = "Game is in progress..."
        } else if (restartbtn.textContent === "Game is in progress...") {
            restartbtn.style.color = "blue";
            restartbtn.style.borderColor = "blue";
            restartbtn.textContent = "Play again?"
        } else if (restartbtn.textContent === "Play again?") {
            restartbtn.style.color = "#FF6C00";
            restartbtn.style.borderColor = "#FF6C00";
            restartbtn.textContent = "Game is in progress..."
        }
    }
}

// Checking which turn it is (circle or cross)
function updateTurn(state) {
    if (state.turn === "cross") {
        state.turn = "circle";
    } else if (state.turn === "circle") {
        state.turn = "cross";
    }
}

// Update game status message, then update message accordingly.
function updatePieceColour(state) {
    if (state.active === true) {
        var x1y1 = document.getElementById("x1y1");
        var x1y2 = document.getElementById("x1y2");
        var x1y3 = document.getElementById("x1y3");
        var x2y1 = document.getElementById("x2y1");
        var x2y2 = document.getElementById("x2y2");
        var x2y3 = document.getElementById("x2y3");
        var x3y1 = document.getElementById("x3y1");
        var x3y2 = document.getElementById("x3y2");
        var x133 = document.getElementById("x3y3");
        x1y1.style.color = "black";
        x1y2.style.color = "black";
        x1y3.style.color = "black";
        x2y1.style.color = "black";
        x2y2.style.color = "black";
        x2y3.style.color = "black";
        x3y1.style.color = "black";
        x3y2.style.color = "black";
        x3y3.style.color = "black";

        // End game if all cells are filled without meeting win condition
        var cellElems = document.getElementsByClassName("gameTableCell");
        for (var i = 0; i < cellElems.length; i++) {
            state.active = false;
            if (cellElems[i].textContent === "") {
                state.active = true;
                break;
            }
        }

        // End game if win condition is met
        if (x1y1.textContent === x1y2.textContent && x1y2.textContent === x1y3.textContent && x1y1.textContent !== "") {
            x1y1.style.color = "green";
            x1y2.style.color = "green";
            x1y3.style.color = "green";
            state.active = false;
        } else if (x2y1.textContent === x2y2.textContent && x2y2.textContent === x2y3.textContent && x2y1.textContent !== "") {
            x2y1.style.color = "green";
            x2y2.style.color = "green";
            x2y3.style.color = "green";
            state.active = false;
        } else if (x3y1.textContent === x3y2.textContent && x3y2.textContent === x3y3.textContent && x3y1.textContent !== "") {
            x3y1.style.color = "green";
            x3y2.style.color = "green";
            x3y3.style.color = "green";
            state.active = false;
        } else if (x1y1.textContent === x2y1.textContent && x2y1.textContent === x3y1.textContent && x1y1.textContent !== "") {
            x1y1.style.color = "green";
            x2y1.style.color = "green";
            x3y1.style.color = "green";
            state.active = false;
        } else if (x1y2.textContent === x2y2.textContent && x2y2.textContent === x3y2.textContent && x1y2.textContent !== "") {
            x1y2.style.color = "green";
            x2y2.style.color = "green";
            x3y2.style.color = "green";
            state.active = false;
        } else if (x1y3.textContent === x2y3.textContent && x2y3.textContent === x3y3.textContent && x1y3.textContent !== "") {
            x1y3.style.color = "green";
            x2y3.style.color = "green";
            x3y3.style.color = "green";
            state.active = false;
        } else if (x1y1.textContent === x2y2.textContent && x2y2.textContent === x3y3.textContent && x1y1.textContent !== "") {
            x1y1.style.color = "green";
            x2y2.style.color = "green";
            x3y3.style.color = "green";
            state.active = false;
        } else if (x3y1.textContent === x2y2.textContent && x2y2.textContent === x1y3.textContent && x3y1.textContent !== "") {
            x3y1.style.color = "green";
            x2y2.style.color = "green";
            x1y3.style.color = "green";
            state.active = false;
        }
    }
}


// Event handing function
function eventHandling(event) {
    var elemObj = document.getElementById(event.target.id);

    if (elemObj !== null) {
        if (elemObj.tagName === "BUTTON" || elemObj.className === "gameTable gameTableCell") {

            // Restarting the game
            if (elemObj.textContent === "Play again?") {
                // Clear all cell contents
                var cellElems = document.getElementsByClassName("gameTableCell");
                for (var i = 0; i < cellElems.length; i++) {
                    cellElems[i].textContent = "";
                    cellElems[i].classList.remove("aInflate");
                }
            }

            // Starting the game or update content during the game
            if ((GameState.active === false && event.target.id === "restartbtn") || GameState.active === true) {
                GameState.active = true;

                if (GameState.active === true) {
                    if (elemObj.textContent === "") {
                        if (GameState.turn === "cross") {
                            elemObj.textContent = "X";
                            elemObj.classList.add("aInflate");
                            updateTurn(GameState);
                            updatePieceColour(GameState);
                            updateGameStatus(GameState);
                        } else if (GameState.turn === "circle") {
                            elemObj.textContent = "O";
                            elemObj.classList.add("aInflate");
                            updateTurn(GameState);
                            updatePieceColour(GameState);
                            updateGameStatus(GameState);
                        }
                    } else if (elemObj.textContent === "Start game" || elemObj.textContent === "Play again?") {
                        updateGameStatus(GameState);
                    }
                }
            }
        }
    }
}







// -------------------------
// Main app
// Initialise state variables on app start
GameState = {};
initialiseStates(GameState);

// Set eventlistener to check for click
document.addEventListener("click", eventHandling);