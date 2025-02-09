function createPlayer(name) {
  return { name };
}

// Defining player actions.
// I will NEED to check for the same inputs.
const PlayerLogic = (function () {
  const Gameboard = [];
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
    const move = prompt(`${player.name} turn: `);
    Gameboard.push({ player: player.name, move });
  };
  const logGameboard = () => console.log(Gameboard);
  return { logGameboard, playerTurn, makeMove, getGameboard };
})();

const player1 = createPlayer("Knight");
const player2 = createPlayer("Bruh");

// Defining win conditions here.
const GameLogic = (function () {
  const filterPlayerMoves = (user) => {
    const filtered = PlayerLogic.getGameboard().filter(
      (player) => player.player === user
    );

    return filtered;
  };

  return { filterPlayerMoves };
})();

// i will do IIFE with resetGame and endGame funcs.
function gameStart() {
  let current = player1;
  const toggleTurn = PlayerLogic.playerTurn(player1, player2);
  let moveNumber = 1;

  for (let i = 0; i < 4; i++) {
    PlayerLogic.makeMove(current);
    // PlayerLogic.logGameboard();
    current = toggleTurn();

    // user filters
    console.log(GameLogic.filterPlayerMoves(player1.name));
    console.log(GameLogic.filterPlayerMoves(player2.name));
    moveNumber++;
  }
}

gameStart();
