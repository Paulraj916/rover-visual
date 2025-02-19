
import Plateau from "./plateau.js";
import { inputParser } from "./utils.js";  

const form = document.querySelector("form");
const textarea = document.querySelector("textarea");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let inputFilePath = textarea.value.trim();

    if (!inputFilePath) {
        console.error("Input field is empty.");
        return;
    }

    let parsedInputData = inputParser(inputFilePath);
    
    if (!parsedInputData) {
        console.error("Cannot parse input data.");
        return;
    }

    let { grid, obstacles, count, roverPos, commands } = parsedInputData;
    console.log(grid, obstacles, count, roverPos, commands);

    const plateau = new Plateau(grid, obstacles, count, roverPos, commands);

});