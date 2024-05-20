import { BOARD_SIZE, DIMENSION, MINES } from "./data";
import {
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

boardElement.addEventListener("click", (e) => {
  // const clickedTile = board
  //   .flat()
  //   .find((tile) => tile.element == clickedTileElement);
  const clickedTile = returnClickedTileObject(e.target, board);
  revealTile();
  console.log("clicked tile", clickedTile);
});

boardElement.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  const clickedTile = returnClickedTileObject(e.target, board);
  if (clickedTile) {
    markTile(clickedTile);
  }
  console.log("click right", clickedTile);
});
