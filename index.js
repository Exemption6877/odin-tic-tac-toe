const GameState = (function () {
  const start = () => {
    const player1 = GameState.gamePlayerCreate();
    const player2 = GameState.gamePlayerCreate();

    PlayerLogic.resetGameboard();

    let current = player1;
    const toggleTurn = PlayerLogic.playerTurn(player1, player2);

    let moveNumber = 0;
    let gameOver = false;
    do {
      if (gameOver) break;

      PlayerLogic.makeMove(current);
      moveNumber++;

      if (GameLogic.winCheck(current.name)) {
        GameState.end(current.name);
        gameOver = true;
        break;
      }

      if (moveNumber === 9) {
        console.log("It's a draw!");
        gameOver = true;
        break;
      }
      current = toggleTurn();
    } while (true);
  };
  const gamePlayerCreate = () => createPlayer(prompt("Player name: "));
  const end = (player) => console.log(`Player ${player} has won!`);

  return { start, end, gamePlayerCreate };
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

  const makeMove = (player) => {
    let move;
    do {
      move = parseInt(prompt(`${player.name} turn: `));
    } while (Gameboard.some((element) => element.move === move));
    Gameboard.push({ player: player.name, move });
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

GameState.start();
