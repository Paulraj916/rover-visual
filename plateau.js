const Rover = require("./rover");
const { isValidPosition } = require("./utils");

class Plateau {
    constructor(grid, obstacles, count, roverPos, commands) {
        this.grid = Array.from({ length: grid[0] }, () => Array(grid[1]).fill(0));
        this.obstacles = obstacles;
        this.rovers = [];
        this.setObstacles();
        this.setRovers(count, roverPos, commands);
    }

    // Set obstacles in the grid as 1
    setObstacles() {
        for (let obstacleCoordinate of this.obstacles) {
            this.grid[obstacleCoordinate[0]][obstacleCoordinate[1]] = 1;
        }
    }

    // Set rovers in the grid as -1,-2,-3,...
    setRovers(count, roverPos, commands) {
        for (let i = 0; i < count; i++) {
            if (isValidPosition(roverPos[i], this.grid)) {
                const rover = new Rover(roverPos[i]);
                let updatedPos = rover.execute(commands[i],this.grid);
                this.rovers.push(updatedPos);
                this.grid[updatedPos[0]][updatedPos[1]]=-(i+1);
            }
        }
    }

    // Display the grid
    displayGrid(){
        for(let i=this.grid.length-1;i>=0;i--){
            console.log(this.grid[i].join('\t'));
        }
    }
}

module.exports = Plateau;