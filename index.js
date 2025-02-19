
const Plateau = require("./plateau");
const { inputParser } = require("./utils");


const inputFilePath = "input.txt"

let parsedInputData = inputParser(inputFilePath);
if(!parsedInputData){
    notificationTrigger("Cannot parse input file")
    return;
}

let {grid, obstacles, count, roverPos, commands } = parsedInputData

const plateau = new Plateau(grid, obstacles, count, roverPos, commands);

plateau.displayGrid();