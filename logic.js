import { MINES, TILE_STATUS } from "./data";

export function generateBoard(boardSize, numberOfMines) {
  const board = [];
  const minePositions = generateMinePositionsDesc(boardSize, numberOfMines);
  console.log("mine positions", minePositions);
  let currentMinePosition = minePositions.pop();
  let currentTilePosition = 0;

  for (let x = 0; x < boardSize; x++) {
    const row = [];

    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUS.HIDDEN;

      const tile = {
        element,
        x,
        y,
        mine: false,
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };

      if (currentTilePosition == currentMinePosition) {
        tile.mine = true;
        currentMinePosition = minePositions.pop();
      }

      currentTilePosition++;

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

export function markTile(tile) {
  if (tile.status != TILE_STATUS.HIDDEN && tile.status != TILE_STATUS.MARKED) {
    return;
  }

  if (tile.status == TILE_STATUS.HIDDEN) {
    tile.status = TILE_STATUS.MARKED;
    return;
  }

  if (tile.status == TILE_STATUS.MARKED) {
    tile.status = TILE_STATUS.HIDDEN;
    return;
  }
}

export function revealTile(tile, board) {
  if (!tile) return;

  if (tile.status != TILE_STATUS.HIDDEN) {
    console.log("not hidden");
    return;
  }

  if (tile.mine) {
    tile.status = TILE_STATUS.MINE;
    console.log("clicked on a mine");
    return;
  }

  tile.status = TILE_STATUS.NUMBER;
  const adjecentTiles = nearbyTiles(board, tile);
  const mines = adjecentTiles.filter((tile) => tile.mine);

  if (mines.length) {
    tile.element.textContent = mines.length;
  } else {
    adjecentTiles.forEach((tile) => revealTile(tile, board));
  }

  // const mines = adjecentTiles.reduce((mineCount, tile) => {
  //   if (tile.mine == true) {
  //     return mineCount + 1;
  //   } else {
  //     return mineCount;
  //   }
  // }, 0);

  // const mines = adjecentTiles.reduce(
  //   (mineCount, tile) => (tile.mine ? mineCount + 1 : mineCount),
  //   0
  // );

  // if (mines) {
  //   tile.element.textContent = mines;
  // }
}

export function returnClickedTileObject(clickOnTile, board) {
  const clickedTileRow = board.find((row) =>
    row.some((tile) => tile.element == clickOnTile)
  );
  if (clickedTileRow) {
    const clickedTile = clickedTileRow.find(
      (tile) => tile.element == clickOnTile
    );
    return clickedTile;
  }

  return;
}

export function countMinesLeft(board) {
  const markedTilesCount = board.reduce(
    (count, row) =>
      count + row.filter((tile) => tile.status == TILE_STATUS.MARKED).length,
    0
  );

  return MINES - markedTilesCount;
}

function nearbyTiles(board, { x, y }) {
  const tiles = [];

  for (let xOffset = -1; xOffset < 2; xOffset++) {
    for (let yOffset = -1; yOffset < 2; yOffset++) {
      let tile = null;
      tile = board[x + xOffset]?.[y + yOffset];

      console.log("tile", tile);
      if (tile) {
        tiles.push(tile);
      }
    }
  }

  console.log("tiles", tiles);
  return tiles;
}

export function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        // is tile a number (revealed)?
        tile.status == TILE_STATUS.NUMBER ||
        (tile.mine &&
          // is tile a mine and is either hidden or mark?
          (tile.status == TILE_STATUS.HIDDEN ||
            tile.status == TILE_STATUS.MARKED))
      );
    });
  });
}

export function checkLose(board) {
  // check if at least one mine is revealed
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status == TILE_STATUS.MINE;
    });
  });
}
