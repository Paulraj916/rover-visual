import { isMove, isTurn, notificationTrigger, triggerMove, triggerTurn } from "./utils.js"

export class Rover {
  constructor(roverPos) {
    this.roverPos = roverPos
  }

  execute(instruction, grid) {
    if (isMove(instruction)) {
      const resPos = triggerMove(instruction, grid, this.roverPos)
      if (JSON.stringify(resPos) !== JSON.stringify(this.roverPos)) {
        this.roverPos = resPos
        return "move"
      }
      if(grid[this.roverPos[0]][this.roverPos[1]]===1){
         notificationTrigger("Invalid move since obstacle found in the way");
      }
      else{
        notificationTrigger(`Invalid move since Rover found in the way`);
      }
      return "obstacle"
    } else if (isTurn(instruction)) {
      this.roverPos[2] = triggerTurn(instruction, this.roverPos[2])
      return "turn"
    }
  }
}

