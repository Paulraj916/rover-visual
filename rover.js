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
      
      notificationTrigger("Invalid move since obstacle found in the way");
      return "obstacle"
    } else if (isTurn(instruction)) {
      this.roverPos[2] = triggerTurn(instruction, this.roverPos[2])
      return "turn"
    }
    else{
      notificationTrigger("Error: Invalid instruction");
    }
  }
}

