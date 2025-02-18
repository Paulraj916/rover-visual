

const Plateau = require("./plateau");
const { inputParser } = require("./utils");

// const grid = [5, 5];
// const obstacles = [[1, 1], [2, 2]];
// const count = 2;
// const roverPos = [[0, 1, "N"], [0, 4, "N"]];
// const commands = ["LLFB", "LLFB"];


const inputFilePath = "input.txt"

let parsedInputData = inputParser(inputFilePath);
if(!parsedInputData){
    console.error("Cannot parse input file");
    return;
}

let {grid, obstacles, count, roverPos, commands } = parsedInputData
console.log(grid, obstacles, count, roverPos, commands);

const plateau = new Plateau(grid, obstacles, count, roverPos, commands);

plateau.displayGrid();