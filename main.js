import { BOARD_SIZE } from "./data";
import "./style.css";

function generateBoard() {
  const board = [];

  for (let x = 0; x < BOARD_SIZE; x++) {
    const row = [];

    for (let y = 0; y < BOARD_SIZE; y++) {
      const element = document.createElement("div");
      element.dataset.status = "hidden";

      const tile = {
        element,
        x,
        y,
      };

      row.push(tile);
    }

    board.push(row);
  }

  //   console.log("board", board);
  return board;
}

const board = generateBoard();
const boardElement = document.querySelector(".board");
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
  });
});

boardElement.style.setProperty("--size", BOARD_SIZE);
