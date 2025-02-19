import { Rover } from "./rover.js"
import { isValidPosition,notificationTrigger } from "./utils.js"

export class Plateau {
  constructor(grid, obstacles, count, roverPos, commands) {
    this.grid = Array.from({ length: grid[0] }, () => Array(grid[1]).fill(0))
    this.obstacles = obstacles
    this.rovers = []
    this.commands = []
    this.setObstacles()
    this.setRovers(count, roverPos,commands)
    this.roverPosArr = roverPos //To store all rovers 
  }

  setObstacles() {
    for (const obstacleCoordinate of this.obstacles) {
      this.grid[obstacleCoordinate[0]][obstacleCoordinate[1]] = 1
    }
  }

  setRovers(count, roverPos,commands) {
    for (let i = 0; i < count; i++) {
      if (isValidPosition(roverPos[i], this.grid)) {
        const rover = new Rover(roverPos[i])
        this.rovers.push([rover,i]) // valid rover object and index
        this.commands.push(commands[i])
      }
      else{
        notificationTrigger(`Obstacle will found when we place Rover ${i+1}`)
      }
    }
  }

  executeInstruction(roverIndex, instruction) {
    const rover = this.rovers[roverIndex][0]
    const oldPos = [...rover.roverPos]
    const result = rover.execute(instruction, this.grid)

    if (result === "move" && (oldPos[0] !== rover.roverPos[0] || oldPos[1] !== rover.roverPos[1])) {
      this.grid[oldPos[0]][oldPos[1]] = 0
      this.grid[rover.roverPos[0]][rover.roverPos[1]] = -(roverIndex + 1)
    }
    
    return result
  }
}

