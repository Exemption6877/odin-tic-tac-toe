function createPlayer(name) {
  return { name };
}

const gameLogic = (function () {
  const Gameboard = [];
  const playerTurn = (player1, player2) => {
    let current = player1;
    return function () {
      current = current === player1 ? player2 : player1;
      return current;
    };
  };
  const makeMove = (player) => {
    const move = prompt(`${player.name} turn: `);
    Gameboard.push({ player: player.name, move });
  };
  const logGameboard = () => console.log(Gameboard);
  return { logGameboard, playerTurn, makeMove };
})();

const player1 = createPlayer("Knight");
const player2 = createPlayer("Bruh");

function gameStart() {
  let current = player1;
  const toggleTurn = gameLogic.playerTurn(player1, player2);
  let moveNumber = 1;

  for (let i = 0; i < 4; i++) {
    gameLogic.makeMove(current);
    gameLogic.logGameboard();
    current = toggleTurn();
    moveNumber++;
  }
}

gameStart();
