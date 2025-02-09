const RenderDOM = (function () {
  const allButtons = document.querySelectorAll(".cell");
  const topContainer = document.querySelector(".top-container");
  const reset = () => {
    if (topContainer.childElementCount > 0) {
      topContainer.removeChild(document.querySelector(".winner"));
    }
    allButtons.forEach((cell) => {
      cell.textContent = " ";
    });
  };
  const start = () => {
    //Add some html flavor
    RenderDOM.reset();
    GameState.start();
  };

  const winner = (player) => {
    const winOutput = document.createElement("h1");
    winOutput.classList.add("winner");

    if (player == "Draw!") {
      winOutput.textContent = `${player}`;
    } else {
      winOutput.textContent = `${player} wins!`;
    }
    topContainer.appendChild(winOutput);
  };

  return { reset, start, winner };
})();

const resetButton = document.querySelector("#reset");
const startButton = document.querySelector("#start");
resetButton.addEventListener("click", () => {
  RenderDOM.reset();
});

startButton.addEventListener("click", () => {
  RenderDOM.start();
});

const GameState = (function () {
  let current;
  let player1;
  let player2;
  let moveNumber;
  let gameOver;

  const start = () => {
    player1 = gamePlayerCreate("1");
    player2 = gamePlayerCreate("2");
    current = player1;
    moveNumber = 0;
    gameOver = false;

    player1.symbol = "X";
    player2.symbol = "O";

    PlayerLogic.resetGameboard();
    document.querySelectorAll(".cell").forEach((button) => {
      button.textContent = "";
      button.disabled = false;
      button.addEventListener("click", handleMove, { once: true });
    });
  };

  const handleMove = (event) => {
    if (gameOver) return;

    const move = parseInt(event.target.value);

    event.target.textContent = current.symbol;
    event.target.disabled = true;

    PlayerLogic.makeMove(current, move);
    moveNumber++;

    if (GameLogic.winCheck(current.name)) {
      console.log(`Player ${current.name} wins!`);
      RenderDOM.winner(current.name);
      gameOver = true;
      return;
    }

    if (moveNumber === 9) {
      console.log("It's a draw!");
      RenderDOM.winner("Draw!");
      gameOver = true;
      return;
    }

    current = current === player1 ? player2 : player1;
  };

  const gamePlayerCreate = (number) =>
    createPlayer(prompt(`Player ${number} name:`));

  return { start };
})();

function createPlayer(name) {
  return { name };
}
const PlayerLogic = (function () {
  const Gameboard = [];
  const resetGameboard = () => {
    Gameboard.length = 0;
  };
  const playerTurn = (player1, player2) => {
    let current = player1;
    return function () {
      current = current === player1 ? player2 : player1;
      return current;
    };
  };

  const getGameboard = () => {
    return Gameboard;
  };

  const makeMove = (player, move) => {
    if (!Gameboard.some((element) => element.move === move)) {
      Gameboard.push({ player: player.name, move });
    }
  };
  const logGameboard = () => console.log(Gameboard);
  return { resetGameboard, logGameboard, playerTurn, makeMove, getGameboard };
})();

// Defining win conditions here.
const GameLogic = (function () {
  const filterPlayerMoves = (user) => {
    const filtered = PlayerLogic.getGameboard().filter(
      (player) => player.player === user
    );

    return filtered.map((value) => value.move);
  };

  const winCheck = (player) => {
    const combinations = [
      // row
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // column
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonal
      [0, 4, 8],
      [2, 4, 6],
    ];

    const playerMoves = GameLogic.filterPlayerMoves(player);
    for (let i = 0; i < combinations.length; i++) {
      const combo = combinations[i];

      let winStatus = true;
      for (let j = 0; j < combo.length; j++) {
        if (!playerMoves.includes(combo[j])) {
          winStatus = false;
          break;
        }
      }
      if (winStatus) {
        return true;
      }
    }
    return false;
  };
  return { filterPlayerMoves, winCheck };
})();

// render factory

// GameState.start();
