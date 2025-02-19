import { display } from './plateau.js';
import { isMove, isTurn, triggerMove, triggerTurn } from './utils.js';
// const {isMove,isTurn,triggerMove,triggerTurn} = require('./utils.js')

export default class Rover {
    constructor(roverPos) {
        this.roverPos = roverPos;
    }

    // inputParser(roverPos) {
    // }
    deepCopy2DArray(arr) {
        const newArray = [];
        for (let i = 0; i < arr.length; i++) {
          newArray[i] = [...arr[i]]; // Use spread syntax for each row
        }
        return newArray;
      }

    async execute(command,grid) {
        const roverImages = {
            'N': 'top.png',
            'E': 'right.png',
            'S': 'bottom.png',
            'W': 'left.png'
        };
        for (let instruction of command) {
            let newGrid = this.deepCopy2DArray(grid);
    
            if (isMove(instruction)) {
                let resPos = triggerMove(instruction, grid, this.roverPos);
                if (JSON.stringify(resPos) === JSON.stringify(this.roverPos)) {
                    console.log("Invalid move since obstacle found in the way");
                    break;
                }
                this.roverPos = resPos;
                newGrid[this.roverPos[0]][this.roverPos[1]] = -1;
    
                await this.delay(1000);  // Wait for 2 seconds
                display(newGrid, roverImages[this.roverPos[2]]);  // Update rover image
    
            } else if (isTurn(instruction)) {
                this.roverPos[2] = triggerTurn(instruction, this.roverPos[2]);
    
                await this.delay(1000);  // Wait for 2 seconds
                display(newGrid, roverImages[this.roverPos[2]]);  // Update rover image
    
            } else {
                console.error("Error: Invalid instruction");
            }
        }
        return this.roverPos;
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
