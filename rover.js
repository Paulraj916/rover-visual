const {isMove,isTurn,triggerMove,triggerTurn} = require('./utils')

class Rover {
    constructor(roverPos) {
        this.roverPos = roverPos;
    }

    // inputParser(roverPos) {
    // }

    execute(command,grid) {
        for(let instruction of command){
            
                        if(isMove(instruction)){
                            let resPos=triggerMove(instruction,grid,this.roverPos);
                            if(JSON.stringify(resPos) === JSON.stringify(this.roverPos)){
                                console.log("Invalid move since obstacle found in the way");
                                break;
                            }
                            this.roverPos=resPos;
                        }
                        else if(isTurn(instruction)){
                            
                            this.roverPos[2]=triggerTurn(instruction,this.roverPos[2]);
            
                        }
                        else{
                            console.error("Error");
                            
                        }
        }
        return this.roverPos;
    }
}

module.exports = Rover;