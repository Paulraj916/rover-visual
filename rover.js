import { isMove, isTurn, triggerMove, triggerTurn } from "./utils.js"

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
      return "obstacle"
    } else if (isTurn(instruction)) {
      this.roverPos[2] = triggerTurn(instruction, this.roverPos[2])
      return "turn"
    }
  }
}

