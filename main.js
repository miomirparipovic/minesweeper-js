import { BOARD_SIZE, DIMENSION } from "./data";
import { generateBoard } from "./logic";
import "./style.css";

const board = generateBoard(BOARD_SIZE);
const boardElement = document.querySelector(".board");
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
  });
});

boardElement.style.setProperty("--size", BOARD_SIZE);
boardElement.style.setProperty("--dimension", DIMENSION);
