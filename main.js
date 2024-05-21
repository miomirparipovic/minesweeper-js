import { BOARD_SIZE, DIMENSION, MINES } from "./data";
import {
  checkLose,
  checkWin,
  countMinesLeft,
  generateBoard,
  markTile,
  returnClickedTileObject,
  revealTile,
} from "./logic";
import "./style.css";

const board = generateBoard(BOARD_SIZE, MINES);
const boardElement = document.querySelector(".board");
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
  });
});

boardElement.style.setProperty("--size", BOARD_SIZE);
boardElement.style.setProperty("--dimension", DIMENSION);

const minesLeft = document.querySelector("#mines-left");
minesLeft.textContent = MINES;

boardElement.addEventListener("click", handleLeftClick);
boardElement.addEventListener("contextmenu", handleRightClick);

function checkIfGameEnded() {
  const win = checkWin(board);
  const lose = checkLose(board);

  // stop revealing more tiles
  if (win || lose) {
    // boardElement.removeEventListener("click", stopProp, { capture: true });
    // boardElement.removeEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You win";
  }

  if (lose) {
    messageText.textContent = "You lose";
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status == TILE_STATUS.MARKED) markTile(tile);
        if (tile.mine) revealTile(tile, board);
      });
    });
  }
}

function handleLeftClick(e) {
  // const clickedTile = board
  //   .flat()
  //   .find((tile) => tile.element == clickedTileElement);
  const clickedTile = returnClickedTileObject(e.target, board);
  revealTile(clickedTile, board);
  checkIfGameEnded();
  // console.log("clicked tile", clickedTile);
}

function handleRightClick(e) {
  e.preventDefault();
  const clickedTile = returnClickedTileObject(e.target, board);
  if (clickedTile) {
    markTile(clickedTile);
    minesLeft.textContent = countMinesLeft(board);
  }
  // console.log("click right", clickedTile);
}
