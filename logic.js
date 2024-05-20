export function generateBoard(boardSize, numberOfMines) {
  const board = [];
  const minePositions = generateMinePositionsDesc(boardSize, numberOfMines);
  console.log("mine positions", minePositions);

  for (let x = 0; x < boardSize; x++) {
    const row = [];

    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = "hidden";

      const tile = {
        element,
        x,
        y,
        // mine: true,
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };

      row.push(tile);
    }

    board.push(row);
  }

  console.log("board", board);
  return board;
}

function generateMinePositionsDesc(boardSize, numberOfMines) {
  const minePositions = new Set();

  while (minePositions.size < numberOfMines) {
    const getRandomInteger = Math.floor(Math.random() * boardSize * boardSize);
    minePositions.add(getRandomInteger);
  }

  return [...minePositions].sort((a, b) => b - a);
}
