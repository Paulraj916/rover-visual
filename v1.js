// class Rover{
    
//     constructor (coordinates , directions ){
//         console.log(coordinates, directions);
//         this.coordinates = coordinates;
//         this.directions = directions;

//     }
//     isMove(instruction){
//         if(instruction === 'F' || instruction === 'B'){
//             return true
//         }
  

//     }
//     isTurn(instruction){
//         if(instruction === 'L' || instruction === 'R'){
//             return true
//         }
//     }
//     triggerMove(instruction){
//         console.log("A move has triggered");
        
//         }
//     triggerTurn(instruction){
//         console.log("A turn has triggered");
        
//     }


//     execute(command){
//         for(let instruction of command){
            
//             if(this.isMove(instruction)){
//                 this.triggerMove(instruction);

//             }
//             else if(this.isTurn(instruction)){
//                 this.triggerTurn(instruction);

//             }
//             else{
//                 console.error("Error");
                
//             }
//         }
//     }



// }

// class Plateau{
//     // obstaclePlacing(dimensions,obstacles){
        
//     //     console.log(this.grid);
//     // }

//     constructor(dimensions,a, directions ,obstacles, rover){
//         console.log(rover);
        

//         //console.log(dimensions,coordinates,directions,obstacles);
//         this.grid = Array.apply(null, Array(dimensions[0])).map(() => (Array.apply(null, Array(dimensions[1])).map(() => 0)));
        
//         for(let obstacleCoordinate of obstacles){
            
//             this.grid[obstacleCoordinate[0]][obstacleCoordinate[1]] = 1;
//         }
//         //obstaclePlacing(dimensions,obstacles);
        
//     }
    
// }

// const coordinates = "[1 2]"
// const directions = "S"
// const dimensions = [5,5];
// const obstacles = [[1,2],[2,2]]
// const rover = new Rover(coordinates,directions);
// const result = rover.execute("LRB");
// const plateau = new Plateau(dimensions,coordinates,directions,obstacles , rover);