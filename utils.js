// const fs = require('node:fs');
export const directions = ['N', 'E', 'S', 'W'];

export function isValidPosition(position, grid) {
    const [x, y, direction] = position;
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] === 0;
}

export function wrapPosition(resPosition, height, width) {
    if (resPosition[0] < 0) {
        resPosition[0] = height - 1;        // height-x(grid.length)
    }
    else if (resPosition[0] >= height) {
        resPosition[0] = 0;
    }
    if (resPosition[1] < 0) {
        resPosition[1] = width - 1;         // width-y(grid[0].length)
    }
    else if (resPosition[1] >= width) {
        resPosition[1] = 0;
    }
    return resPosition;
}

export function isTurn(instruction) {
    return instruction === 'L' || instruction === 'R';
}

export function isMove(instruction) {
    return instruction === 'F' || instruction === 'B';
}

export function triggerMove(instruction,grid,roverPos){
    let resPos = [...roverPos]; //let resPos=roverPos; will not work as it will change the original array as well
    let direction=roverPos[2];
    if(instruction==='F'){
        if (direction==='N')resPos[0]++;
        else if (direction==='S')resPos[0]--;
        else if (direction==='E')resPos[1]++;
        else if (direction==='W')resPos[1]--;
    }
    else{
        if (direction==='N')resPos[0]--;
        else if (direction==='S')resPos[0]++;
        else if (direction==='E')resPos[1]--;
        else if (direction==='W')resPos[1]++;
    }
    //to validate position and wrap the updated position if needed
    resPos=wrapPosition(resPos,grid.length,grid[0].length);
    if(!isValidPosition(resPos,grid)) return roverPos;
    return resPos;
}

export function triggerTurn(instruction, initialDirection) {
    const directionMap = { 'N': 0, 'E': 1, 'S': 2, 'W': 3 };
    // const reverseDirectionMap = ['N', 'E', 'S', 'W']; //not needed
    if (!isTurn(instruction)) {
        throw new Error("Invalid turn instruction. Must be 'L' or 'R'.");
    }

    let direction = directionMap[initialDirection];

    // Modulo operation of Turn Algorithm
    direction = (instruction === 'L') ? (direction + 3) % 4 : (direction + 1) % 4;

    return directions[direction];
}


// export default function getFileContent(inputFilePath){
//     try {
//         const data = fs.readFileSync(inputFilePath, "utf8");
//         return data;
//     } catch (err) {
//         console.error("Error reading file:", err);
//         return null;
//     }
// }

export function inputParser(inputFilePath){

    const fileContent = inputFilePath;
    // console.log(fileContent)
    try{
    let grid = [] , obstacles =[],count ,roverPos =[],commands =[];
    
    if(!fileContent){
        throw new Error("File is empty");
    }

    const lines = fileContent.split('\n');
    // console.log(lines)

    grid = lines[0].split(' ').map((i)=>Number(i));
    // console.log(grid)

    if(grid.length  !== 2 || isNaN(grid[0]) || isNaN(grid[1])){
        throw new Error("Grid is Invalid")
    }

    let obstacleCount = Number(lines[1])
    // console.log(obstacleCount)
    if(!obstacleCount || isNaN(obstacleCount)){
        throw new Error("obstacleCount is Invalid")
    }

    for(let i = 2 ; i < obstacleCount + 2 ; i++){
        let obstacle = lines[i].split(' ').map((i)=>Number(i));

        if (obstacle.length !== 2 || isNaN(obstacle[0]) || isNaN(obstacle[1]) || obstacle[0]>=grid[0] || obstacle[1] >= grid[1]) {
            throw new Error(`Invalid obstacle at line ${i+1}`);
        }
        obstacles.push(obstacle);
    }
    // console.log("obstacles: ",obstacles)

    count = Number(lines[obstacleCount + 2]);

    // console.log("count: ",count)
    if(!count || isNaN(count)){
        throw new Error("Rover Count is Invalid");
    }

    let roverStartIndex = 3 + obstacleCount 
    let roverEndIndex = roverStartIndex + count*2;


    for(let i = roverStartIndex ; i < roverEndIndex ; i+=2){
        
        let [x,y,dir] = lines[i].split(' ');
        dir = dir.replace('\r', ''); // Remove \r from the direction

        if (isNaN(Number(x)) || isNaN(Number(y)) || !directions.includes(dir)) {
            throw new Error(`Invalid rover position at line ${i + 1}`);
        }

        roverPos.push([Number(x),Number(y),dir])

        let command = lines[i+1].replace('\r', ''); // Remove \r from the command
        // console.log(Array.from(command).every((char)=>"LRFB".includes(char)));
       
        if(!Array.from(command).every((char)=>"LRFB".includes(char))){
            throw new Error(`Invalid command at line ${i + 2}`);
        }
        commands.push(command);

    }


    // console.log("roverPos: ",roverPos)
    // console.log("commands: ",commands)
    return {grid,obstacles,count,roverPos,commands} 
    }
    catch (err) {
        console.error(err.message);
        return null;
    }
}


